//takes raw content from post route, and derives links/realtions

function parseLinks(content){
    const regex = /\[\[(.*?)\]\]/g;
    const links=[];
    let match
    while ((match = regex.exec(content)) !== null) {
        links.push(match[1]);
      }
      return [...new Set(links)];
    }

    module.exports = parseLinks;