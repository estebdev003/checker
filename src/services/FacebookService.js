const { facebook: urls } = require("../config/urls");
const queries = require("../config/queries");
const axios = require('axios');

/**
 * Class to scrap facebook groups
 */
class FacebookService {    
    constructor(groups) {
        this.groups = groups;
    }

    /**
     * Scrap groups of class to get info adn return ids of groups without revision
     * @returns { Array<number> } ids of groups without revision
     */
    async getGroupsWithoutRevision() {
        const groups = [];

        // Get groups info
        const scrapData = await this.scrap();

        // Get groups ids without revision
        scrapData.forEach(group => {
            if(group.info === 'No tiene revision') {
                groups.push(group.id);
            }
        });

        // Return unique values with Set
        return [...new Set(groups)];
    }

    /**
     * Scrap info of groups
     * @returns { Array<Object> } Array of objects with group id and info
     */
    async scrap() {
        const groupsInfo = [];
        for(let groupId of this.groups) {
            groupId = Number(groupId);
            if(!groupId) continue;
 
            let info = 'No tiene revision';
            try{
                const res = await axios.post(
                    urls.groupUrl + '?group_id=' + groupId + queries.params.facebook,
                    queries.bodyFormData.facebook,
                    { 
                        headers: queries.headers.facebook 
                    }
                );
                
                if(res.data.includes('Se ha producido un problema con esta solicitud')) {
                    info = 'Error o no existe';
                }

                if(res.data.includes('__html')) {
                    info = 'Revision';
                }

                if(res.data.includes('El contenido solicitado no puede mostrarse en este momento')) {
                    info = 'No existe';
                }
            } catch (e) {
                info = 'error';
                console.log('Error al obtener la información del grupo', groupId, e.message);
            }

            groupsInfo.push({
                id: groupId,
                info
            });
        }

        return groupsInfo;
    }
}

module.exports = FacebookService;