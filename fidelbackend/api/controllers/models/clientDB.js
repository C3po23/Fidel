exports.selectAllClient = selectAllClient;
exports.selectOneClientById = selectOneClientById;
exports.selectOneClientByName = selectOneClientByName;


function selectOneClientById(client) {
    return "SELECT * FROM fidel.client WHERE client.\"ID\"='" + client + "' ORDER BY \"ID\" ASC;";
};

function selectOneClientByName(client) {
    client = client.toLowerCase();
    query = "SELECT * FROM fidel.client WHERE client.nom LIKE '%" + client + "%' ORDER BY client.nom ASC;";
    return query;
};

function selectAllClient() {
    return "SELECT * FROM fidel.client ORDER BY \"ID\" ASC;";
};
