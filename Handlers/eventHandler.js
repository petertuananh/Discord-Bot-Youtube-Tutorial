const fs = require('fs');
const ascii = require('ascii-table');

let table = new ascii("Events list");
table.setHeading("Name", "Status");

module.exports = (client) => {
    fs.readdirSync(`./Events/`).forEach(dir => {
        const events = fs.readdirSync(`./Events/${dir}/`).filter(file => file.endsWith(".js"));

        for (let file of events) {

            try {
                let pull = require(`../Events/${dir}/${file}`);

                if (pull.name) {
                    client.events.set(pull.name, pull);
                    table.addRow(file, `❌  > Error`);
                } else {
                    table.addRow(file, `✅  > Loaded`);
                    continue;
                }
            } catch (e) {
                console.log(e)
                table.addRow(file, `❌  > Error`);
            }

        }
    });

    console.log(table.toString());
}