const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const keys = require("./config/keys");
const app = express();

const Champion = require("./classes/Champion");
const Rune = require("./classes/Rune");
const Spell = require("./classes/Spell");
const Item = require("./classes/Item");

/** Configure Kayn for use **/
const { Kayn, REGIONS } = require("kayn");
const kayn = Kayn(keys.riotApiKey)({
  region: REGIONS.NORTH_AMERICA,
  locale: "en_US",
  debugOptions: {
    isEnabled: true,
    showKey: false
  },
  requestOptions: {
    shouldRetry: true,
    numberOfRetriesBeforeAbort: 3,
    delayBeforeRetry: 1000,
    burst: false,
    shouldExitOn403: false
  },
  cacheOptions: {
    cache: null,
    timeToLives: {
      useDefault: false,
      byGroup: {},
      byMethod: {}
    }
  }
});
/** End Kayn Config **/

/** Build Kayn queries and parse them **/
async function getSummonerAccountId(summonerName) {
  try {
    const summoner = await kayn.SummonerV4.by
      .name(summonerName)
      .region(REGIONS.NORTH_AMERICA);
    return summoner.accountId;
  } catch (err) {
    console.log(err);
  }
}

// retrieve gameId's from matches object
function extractGameIdsFromMatchArray(matchArr) {
  var gameIds = [];
  for (i = 0; i < matchArr.length; i++) {
    gameIds[i] = matchArr[i].gameId;
  }

  return gameIds;
}

async function getRecentMatchesByAccountId(accountId) {
  try {
    const matches = await kayn.MatchlistV4.Recent.by.accountID(accountId);
    return extractGameIdsFromMatchArray(matches.matches);
  } catch (err) {
    console.log(err);
  }
}

async function getRecentMatchData(gameIds = []) {
  matches = [];

  var limit = gameIds.length < 3 ? gameIds.length : 3;

  for (var i = 0; i < limit; i++) {
    try {
      const match = await kayn.MatchV4.get(gameIds[i]);
      matches.push(match);
    } catch (err) {
      console.log(err);
    }
  }

  return matches;
}

// retrieve player identity from match data
function extractParticipantIdFromIdentitiesArray(idArr, summonerId) {
  for (var j = 0; j < idArr.length; j++) {
    if (idArr[j].player.accountId === summonerId) {
      return idArr[j].participantId;
    }
  }
}

// Parse match data into a usable data object to be returned to the front end
function parseMatchData(match, accountId) {
  // Locate the player identity
  const playerIdentity = extractParticipantIdFromIdentitiesArray(
    match.participantIdentities,
    accountId
  );

  // console.log(playerIdentity);

  // Retrieve player object from match
  var playerData = undefined;
  try {
    playerData = match.participants[playerIdentity - 1]; // offset the id to match participant array
  } catch (err) {
    console.log(err);
  }
  // console.log(playerData);
  //Create Meta object
  const meta = {
    gameMode: match.gameMode,
    gameCreation: match.gameCreation,
    gameDuration: match.gameDuration,
    winStatus: playerData.stats.win
  };
  // console.log(meta);

  const player = {
    summonerName: "",
    champion: new Champion(playerData.championId),
    spell: [new Spell(playerData.spell1Id), new Spell(playerData.spell2Id)],
    rune: [
      new Rune(playerData.stats.perkPrimaryStyle, playerData.stats.perk0),
      new Rune(playerData.stats.perkSubStyle)
    ]
  };
  // console.log(player);
  // calculate cs
  var creepScore =
    playerData.stats.totalMinionsKilled + playerData.stats.neutralMinionsKilled;
  // calculate cspm
  var gameDurationInMinutes = match.gameDuration / 60;
  var creepScorePerMin = creepScore / gameDurationInMinutes;

  const stats = {
    kills: playerData.stats.kills,
    deaths: playerData.stats.deaths,
    assists: playerData.stats.assists,
    champLevel: playerData.stats.champLevel,
    creepScore: creepScore,
    creepScorePerMin: creepScorePerMin
  };

  // console.log(playerData.stats);
  // Find a way to do this in a loop if possible
  const item = [
    new Item(playerData.stats.item0),
    new Item(playerData.stats.item1),
    new Item(playerData.stats.item2),
    new Item(playerData.stats.item3),
    new Item(playerData.stats.item4),
    new Item(playerData.stats.item5),
    new Item(playerData.stats.item6)
  ];

  const matchData = {
    meta: meta,
    player: player,
    stats: stats,
    item: item
  };
  return matchData;
  // console.log(item);
}

async function executeQuery(summonerName) {
  // First, get the summoner's account ID
  const accountId = await getSummonerAccountId(summonerName);
  // console.log(accountId);
  // Second, retrieve the summoner's recent matches
  const recentMatchIds = await getRecentMatchesByAccountId(accountId);
  // console.log(recentMatchIds);
  // Third, retrieve independent match data for each match
  const recentMatchData = await getRecentMatchData(recentMatchIds);

  // Iterate over matches and extract relevant data
  var matches = [];
  for (var i = 0; i < recentMatchData.length; i++) {
    matches.push(parseMatchData(recentMatchData[i], accountId));
  }
  console.log(matches);
  return matches;
}

// executeQuery("best chopsticks");
/** End of Kayn queries/parsing**/

// Enable request body JSON parsing middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Create a sample root route
app.post("/api/matches", async (req, res) => {
  try {
    var apiData = await executeQuery(req.body.summonerName);
    res.send(JSON.stringify(apiData));
  } catch (err) {
    res.send(JSON.stringify(err));
  }
});

// Serve static content to be accessed by /img/path/to/file
app.use(express.static("public"));

// Production Setup to serve React front end when deployed to heroku
if (process.env.NODE_ENV === "production") {
  // Serve React build statically
  app.use(express.static(path.join(__dirname, "client/build")));
  // Handle React routing, catch all to return all requests to React app
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

// dynamic port binding for heroku
// read port from environment variable
const PORT = process.env.PORT || 5000;
app.listen(PORT);
