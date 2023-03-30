const ObjectsToCsv = require('objects-to-csv');

module.exports = class CsvService {
    constructor(objects = []) {
        this.objects = objects;
    }

    async convertToCsv() {
        return Buffer.from(
            await new ObjectsToCsv(this.objects)
                .toString()
        );
    }
}