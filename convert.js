const fs = require('fs');
const axios = require('axios');
const {get} = require('lodash');

axios.get('https://raw.githubusercontent.com/FortAwesome/Font-Awesome/6.x/metadata/icons.json').then(function (resp) {
    convertData(resp.data);
});

function convertData(data) {
    const results = new Array;
    for (const name in data) {
        const icon = get(data, name);
        const aliases = get(icon, 'aliases.names', new Array);
        for (const style of icon.free) {
            const style_data = {
                name: name,
                class: getBrandClass(name, style),
                style: style,
                search: icon.search.terms.concat(aliases),
                unicode: icon.unicode,
                label: icon.label
            };
            results.push(style_data);
        }
    }
    writeJsonFile('data.json', results);
}

function writeJsonFile(name, data) {
    const raw = JSON.stringify(data, null, 4);
    fs.writeFileSync(name, raw);
}

function getBrandClass(index, value) {
    switch (value) {
        case 'solid':
            return `fas fa-${index}`;
        case 'regular':
            return `far fa-${index}`;
        case 'brands':
            return `fab fa-${index}`;
    }
}