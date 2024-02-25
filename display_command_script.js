function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
    }
    return result;
}

function updateFloatingElementPosition(inity, initx) {
    const floatingElement = document.getElementById("search");
    floatingElement.style.position = 'static';
    const boundingClientRect = floatingElement.getBoundingClientRect();
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollLeft = window.scrollX || document.documentElement.scrollLeft;
    const topOffset = boundingClientRect.top + scrollTop;
    const leftOffset = boundingClientRect.left + scrollLeft;
    floatingElement.style.position = 'fixed';
    floatingElement.style.top = (inity + window.scrollY).toString() + "px";
    //floatingElement.style.left = (initx + window.scrollX).toString() + "px";
}

function display_command(data, create_new) {
    let commandInfoDiv1;
    let commandInfoDiv;
    let nameParagraph;
    if (create_new === true) {
        commandInfoWrapper = document.getElementById('command_info_wrapper')
        commandInfoDiv1 = document.createElement('div');
        //displayid = data.name//generateRandomString(14);
        commandInfoDiv1.id = data.name;
        commandInfoDiv1.className = 'command-info';
        //commandInfoDiv1.style = 'margin: 10px; padding: 30px;'
        //br = document.createElement('br');
        commandInfoWrapper.appendChild(commandInfoDiv1);
        //commandInfoWrapper.appendChild(br);
    } else {
        commandInfoDiv1 = document.getElementById('command-info');
        commandInfoDiv1.className = 'command-info';
    }
    //const commandInfoDiv = document.getElementById(displayid);
    

    commandInfoDiv = document.createElement('div');
    commandInfoDiv.id = data.name;

    nameParagraph = document.createElement('div');
    nameParagraph.className = 'command_name_div';
    nameParagraph.innerHTML = `<h1>${data.name}</h1>`;
    commandInfoDiv1.appendChild(nameParagraph);

    const descriptionParagraph = document.createElement('div');
    descriptionParagraph.className = 'command_data_div';
    descriptionParagraph.innerHTML = `<h2>Description:</h2><p>${data.description}</p>`;
    commandInfoDiv.appendChild(descriptionParagraph);

    const argsList = document.createElement('div');
    argsList.className = 'command_data_div';
    argsList.innerHTML = '<h2>Arguments:</h2>';
    if (data.args && data.args.length > 0) {
        data.args.forEach(arg => {
            const argItem = document.createElement('div');
            argItem.className = 'args_list_item'
            argItem.innerHTML = `<h3>${arg.name}:</h3><p><strong>Description:</strong><br>${arg.description}<br><br><strong>Type:</strong> ${arg.type}<br><strong>Required:</strong> ${arg.required}<br><strong>Default:</strong> ${arg.default}</p>`;
            argsList.appendChild(argItem);
        });
    } else {
        const argItem = document.createElement('div');
        argItem.className = 'args_list_item'
        argItem.innerHTML = `There are no arguments`;
        argsList.appendChild(argItem);
    }
    commandInfoDiv.appendChild(argsList);

    const nsfw = document.createElement('div');
    nsfw.className = 'command_data_div';
    nsfw.innerHTML = `<p><strong>NSFW:</strong> ${data.nsfw}</p>`;
    commandInfoDiv.appendChild(nsfw);

    const restricted = document.createElement('div');
    restricted.className = 'command_data_div';
    restricted.innerHTML = `<p><strong>Restricted:</strong> ${data.restricted}</p>`;
    commandInfoDiv.appendChild(restricted);

    const stable = document.createElement('div');
    stable.className = 'command_data_div';
    stable.innerHTML = `<p><strong>Stable:</strong> ${data.stable}</p>`;
    commandInfoDiv.appendChild(stable);

    const aliases = document.createElement('div');
    aliases.className = 'command_data_div';
    if (data.aliases && data.aliases.length > 0 && data.aliases[0] !== '') {
        aliases.innerHTML = `<p><strong>Ctx Aliases:</strong> ${data.aliases.join(', ')}</p>`;
    } else {
        aliases.innerHTML = '<p><strong>Ctx Aliases:</strong> None</p>'
    }
    commandInfoDiv.appendChild(aliases);

    const requiredPermissionsList = document.createElement('div');
    requiredPermissionsList.className = 'command_data_div';
    if (data.required_permissions && data.required_permissions.length > 0) {
        requiredPermissionsList.innerHTML = `<p><strong>Required Permissions:</strong> ${data.required_permissions.join(', ')}</p>`;
    } else {
        requiredPermissionsList.innerHTML = `<p><strong>Required Permissions:</strong> None</p>`;
    }
    commandInfoDiv.appendChild(requiredPermissionsList);

    const requiredBotPermissionsList = document.createElement('p');
    requiredBotPermissionsList.className = 'command_data_div';
    if (data.required_bot_permissions && data.required_bot_permissions.length > 0) {
        requiredBotPermissionsList.innerHTML = `<p><strong>Required Bot Permissions:</strong> ${data.required_bot_permissions.join(', ')}</p>`;
    } else {
        requiredBotPermissionsList.innerHTML = `<p><strong>Required Bot Permissions:</strong>: None</p>`;
    }
    commandInfoDiv.appendChild(requiredBotPermissionsList);

    const toggleButton = document.createElement('button');
    toggleButton.className = 'toggle-button';
    toggleButton.innerHTML = '<img src="arrow-collapse.svg"></img>'
    commandInfoDiv1.appendChild(toggleButton);

    toggleButton.addEventListener('click', function() {
        //const content = commandInfoDiv1.querySelector('.command_data_div');
        commandInfoDiv.style.display = commandInfoDiv.style.display === 'none' ? 'block' : 'none';
        const value = commandInfoDiv.style.display === 'none';
        commandInfoDiv1.style.margin = commandInfoDiv.style.display === 'none' ? '1px' : '5px';
        commandInfoDiv1.style.padding = commandInfoDiv.style.display === 'none' ? '3px' : '20px';
        nameParagraph.innerHTML = commandInfoDiv.style.display === 'none' ? `<p style="margin:5px">${data.name}</p>` : `<h1>${data.name}</h1>`;
        toggleButton.getElementsByTagName('img')[0].src = commandInfoDiv.style.display === 'none' ? 'arrow-expand.svg' : 'arrow-collapse.svg';
    });

    commandInfoDiv1.appendChild(commandInfoDiv);

}