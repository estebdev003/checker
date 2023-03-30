module.exports = {
    facebook: {
        baseUrl: 'https://www.facebook.com/',
        get groupUrl () {
            return `${this.baseUrl}ajax/groups/unified_queue/count_badge/`;
        }
    }
}