require('dotenv').config();
const fs = require('fs');
const axios = require('axios');

const port = process.env.SERVER_PORT || 3000;
const baseUrl = "http://138.68.81.169";
const route = "/groups-without-revision/batch?"
const limit = 100;

const getGroupsWithoutRevisionOfFile = async (filepath, limit, cb) => {
    let counter = 0;
    const groups = [];

    const groupsChunks = chunkArray( 
        fs.readFileSync(filepath, 'utf8').split(/\r?\n/),
        10
    );

    for(let chunk of groupsChunks) {
        let url = baseUrl + route;
        if(limit && counter >= limit) break;
        //Create url with groups chunked
        chunk.forEach((line) => {
            if(limit && counter >= limit) return;
            url += `groups[]=${line}&`;
            counter++;
        });

        try{
            const res = await axios.post(url, {
                secret: process.env.PASSPORT_SECRET
            });
            const chunkGroups = res.data.groups;
            groups.push(chunkGroups);
            cb(chunkGroups);
        } catch (err) {
            console.log(err.message);
        }
    }

    return groups;
};

const chunkArray = (array, size) => {
    const chunkedArray = [];
    for(let i = 0; i < array.length; i += size) {
        chunkedArray.push(array.slice(i, i + size));
    }
    return chunkedArray;
};

const exportGroupsToFile = async (groups, filepath) => {
    fs.appendFileSync(filepath, groups.join('\n') + '\n');
};

//Reset file
const filepath = 'groupsWithoutRevision.txt';
if(fs.existsSync(filepath)) fs.unlinkSync(filepath);
fs.writeFileSync(filepath, '');

//Get groups without revision and insert chunks into file
getGroupsWithoutRevisionOfFile('groups.txt', limit, (groups) => {
    exportGroupsToFile(groups, 'groupsWithoutRevision.txt');
})
