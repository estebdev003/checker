(() => {
    const vars = {
        baseUrl: 'http://localhost:3002',
        route: '/groups-without-revision/batch',
        checkGroupsIds: [],
        checkedGroupsIds: [],
        chunks: 5,
    }

    const elements = {
        groupsIdsTextArea: document.getElementById('groups-ids'),
        checkButton: document.getElementById('check-button'),
        checkedGroupsIds: document.getElementById('checked-groups-ids'),
        loading: document.getElementById('loading'),
        exportButton: document.getElementById('export-button'),
        passwordInput: document.getElementById('password'),
    };

    const methods = {
        init(){
            this.listeners();
        },
        listeners() {
            elements.groupsIdsTextArea.oninput = methods.getGroupsIds;
            elements.checkButton.onclick = methods.checkGroups;
            elements.exportButton.onclick = methods.downloadCsv;
        },
        async checkGroups() {
            methods.setLoading();
            elements.exportButton.classList.add('disabled');
            vars.checkedGroupsIds = [];
            const queries = []
            const groups = vars.checkGroupsIds;
            const chunkedGroups = methods.chunkArray(groups, vars.chunks);
            for (const groups of chunkedGroups) {
                queries.push(methods.getGroups(groups));
            }

            await Promise.all(queries);
            methods.setLoading(false);
            
            if(vars.checkedGroupsIds.length > 0) elements.exportButton.classList.remove('disabled');
        },
        async setLoading (loading = true) {
            elements.loading.style.display = loading ? 'block' : 'none';
        },
        async getGroups(groups) {
            //Construct url with groups ids
            const url = `${vars.baseUrl}${vars.route}?groups[]=${groups.join('&groups[]=')}`;
            try{
                //Fetch data with secret password
                const data = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ secret: elements.passwordInput.value })
                }).then(response => response.json())

                //If there is no data or Unauthorized, return
                if(!data.groups) return;

                //Add groups to checkedGroupsIds
                vars.checkedGroupsIds.push(...data.groups);
                elements.checkedGroupsIds.value = vars.checkedGroupsIds.join('\n');
            } catch (e) {
                console.log("Error obteniendo datos", e.message);
            }
        },
        getGroupsIds() {
            const groups = elements.groupsIdsTextArea.value;
            vars.checkGroupsIds = groups.split(/\n|\s|,/);
        },
        chunkArray(array, size) {
            const chunkedArray = [];
            let index = 0;
            while (index < array.length) {
                chunkedArray.push(array.slice(index, size + index));
                index += size;
            }
            return chunkedArray;
        },
        createCsv() {
            let csvContent = "data:text/csv;charset=utf-8,";
            const data = vars.checkedGroupsIds;

            if(data.length === 0) return "";

            csvContent += "id\r\n";
            data.forEach(function(id){
                csvContent += id + "\r\n";
            });

            return csvContent;
        },
        downloadCsv() {
            const csvContent = methods.createCsv();
            if(!csvContent) return;
            var encodedUri = encodeURI(csvContent);
            var link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", "my_data.csv");
            document.body.appendChild(link);

            link.click();
        }
    };

    methods.init();
})();