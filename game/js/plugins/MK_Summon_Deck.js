/*:
 * @target MZ
 * @author Aerosys
 * @plugindesc [Tier 2] [Version 0.0.5] [MV & MZ]
 * @base MK_Summon
 * @orderAfter MK_Summon
 * 
 * 
 * @help
 * 
 * ----------------------------------------------------------------------------
 * Rules
 * ----------------------------------------------------------------------------
 * 
 * 1. This Plugin is free of charge and can be used in any kind of game.
 * 
 * 2. You may not redistribute this Plugin or claim it as your own.
 *    
 *    a) Exception: You may redistribute this plugin as part of your game when
 *       releasing it.
 *    b) Exception: You may send this plugin to another person when you hire
 *       them for personal modifications.
 * 
 * 3. You may modify this plugin's source code for your needs but cannot
 *    redistribute your modifications.
 * 
 * 4. You may create plugins based on this (e.g. addon or extension) for your
 *    needs but you cannot redistribute them.
 * 
 * 
 * ----------------------------------------------------------------------------
 * Notetags
 * ----------------------------------------------------------------------------
 * 
 * <Summon Deck Size: +/- x>
 * - can be applied on Actors, Classes, Equip, & States
 * - Negative Numbers allowed
 * - increases or decreases the Deck Size for this Actor
 * 
 * Examples:
 * <Summon Deck Size: +2>
 * <Summon Deck Size: -1>
 * 
 * 
 * @endofhelp
 * 
 * 
 * @command setDeckCommandVisibility
 * @text Change Deck Command Visibility
 * @desc Change whether the "Deck" Command is visible in Menu or not.
 * 
 * @arg mode
 * @text Mode
 * @type select
 * @option show
 * @option hide
 * @default show
 * 
 * 
 * @command setModifySummonDecksAllowed
 * @text Change Modify Decks Access
 * @desc Change whether the Player can modify their deck(s)
 * 
 * @arg mode
 * @text Mode
 * @type select
 * @option allow
 * @option forbid
 * @default allow
 * 
 * 
 * @command getSummonDeckSize
 * @text Get Deck Size
 * @desc Reads the Deck Size and puts it into a Variable for later Retrieval
 * 
 * @arg variableId
 * @text Variable
 * @type variable
 * @default 1
 * 
 * 
 * @command setSummonDeckSize
 * @text Change Deck Size
 * @desc Changes the Deck Size
 * 
 * @arg mode
 * @text Mode
 * @type select
 * @option Increase
 * @option Decrease
 * @option Set to
 * @default Increase
 * 
 * @arg value
 * @text Value
 * @type number
 * @default 1
 * 
 * 
 * @command hasPetInDeck
 * @text Has Actor x Pet in their Deck?
 * @desc Set Switch to ON if the player has this Pet in their Deck
 * 
 * @arg petId
 * @text Pet
 * @type actor
 * @default 2
 * 
 * @arg switchId
 * @text Switch to Store
 * @type switch
 * @default 1
 * @desc Switch to store Info for later Retrieval
 * 
 * 
 * @command addPetToDeck
 * @text Add Pet to Deck
 * @desc Party must own this Pet
 * 
 * @arg deckIndexMode
 * @text Deck Index
 * @type select
 * @option fixed
 * @option by Variable
 * @option first free Slot
 * @default first free Slot
 * 
 * @arg deckIndexWhenFixed
 * @parent deckIndexMode
 * @text when fixed:
 * @type number
 * @default 1
 * 
 * @arg deckIndexWhenByVariable
 * @parent deckIndexMode
 * @text when by Variable:
 * @type variable
 * @default 1
 * 
 * @arg petIdMode
 * @text Pet
 * @type select
 * @option fixed
 * @option by Variable
 * @default fixed
 * 
 * @arg petIdWhenFixed
 * @parent petIdMode
 * @text when fixed:
 * @type actor
 * @default 1
 * 
 * @arg petIdWhenByVariable
 * @parent petIdMode
 * @text when by Variable:
 * @type variable
 * @default 1
 * 
 * 
 * @command removePetFromDeck
 * @text Remove Pet from Deck
 * 
 * @arg petIdMode
 * @text Pet
 * @type select
 * @option fixed
 * @option by Variable
 * @default fixed
 * 
 * @arg petIdWhenFixed
 * @parent petIdMode
 * @text when fixed:
 * @type actor
 * @default 1
 * 
 * @arg petIdWhenByVariable
 * @parent petIdMode
 * @text when by Variable:
 * @type variable
 * @default 1
 * 
 * 
 * @param gameplay
 * @text Gameplay
 * 
 * @param isSummonDeckCommandVisible
 * @parent gameplay
 * @text is "Deck" visible in Menu?
 * @type boolean
 * @default true
 * @desc Can be changed during the game
 * 
 * @param isModifyEnabledByDefault
 * @parent gameplay
 * @text is modifying Decks allowed?
 * @type boolean
 * @default true
 * @desc Can be changed during the game
 * 
 * @param summonDeckSize
 * @parent gameplay
 * @text Starter Deck Size
 * @type number
 * @default 4
 * @desc Can be changed during the game
 * 
 * @param onDeckModifyEval
 * @parent gameplay
 * @text JS: On Deck modify
 * @type note
 * @default "// constants\nconst index = arguments[0];\nconst replacedPet = $gameActors.actor(arguments[1]);\nconst substitutePet = $gameActors.actor(arguments[2]);\n// replacedPet and substitutdPet might be null!\n\n// custom code below\n"
 * 
 * 
 * @param a
 * @text _
 * 
 * @param ui
 * @text UI general
 * 
 * @param deckLayout
 * @parent ui
 * @text Deck Menu Layout
 * @type select
 * @option Deck Top, Reserve List Bottom
 * @value horizontal
 * @option Deck Left, Reserve List Right
 * @value vertical
 * @default horizontal
 * 
 * 
 * @param b
 * @text _
 * 
 * @param deckList
 * @text Deck
 * 
 * @param deckPortraitStyle
 * @parent deckList
 * @text Portrait Style
 * @type select
 * @option Face
 * @option Sprite
 * @option Battler Sprite
 * @default Battler Sprite
 * 
 * @param deckListCustomBackgroundEval
 * @parent deckList
 * @text JS: Custom Background Draw
 * @type note
 * @default "// constants\nconst index = arguments[0];\n\n// custom code below\nif ('MV' != Utils.RPGMAKER_NAME) return;\n\nconst color1 = \"rgba(220, 220, 220, 0.2)\";\nconst color2 = \"rgba(100, 100, 100, 0.5)\";\nconst rectangle = this.itemRect(index);\n\nthis.contents.fillRect(\n    rectangle.x,\n    rectangle.y,\n    rectangle.width,\n    rectangle.height,\n    color1,\n);"
 * 
 * @param deckListCustomDrawEval
 * @parent deckList
 * @text JS: Deck List Custom Draw
 * @type note
 * @default "// constants\nconst window = this;\nconst index = arguments[0];\nconst pet = arguments[1]; // might be null!\n\n// custom Code below\n"
 * 
 * 
 * @param c
 * @text _
 * 
 * 
 * @param statusWindow
 * @text Status & Params Window
 * 
 * @param showPetLevel
 * @parent statusWindow
 * @text Show Pet Level?
 * @type boolean
 * @default true
 * @desc You may want to hide it when the Pet level is synced with the Summoner's
 * 
 * @param statusWindowCustomDrawEval
 * @parent statusWindow
 * @text JS: Custom Draw
 * @type note
 * @default "// constants\nconst window = this;\nconst pet = arguments[0];\n\n// custom code\n\nif (!pet) return;\n\nconst x1 = 50;\nconst w1 = 50;\nconst x2 = this.contentsWidth() / 2;\nconst w2 = this.contentsWidth() / 3;\nconst x3 = this.contentsWidth() - 52;\nconst w3 = 48;\nconst faceHeight = ImageManager.faceHeight || Window_Base._faceHeight;\n\nconst systemColor = 'MZ' == Utils.RPGMAKER_NAME\n    ? ColorManager.systemColor()\n    : this.systemColor();\n\nthis.drawFace(\n    pet.faceName(),\n    pet.faceIndex(),\n    0,\n    0,\n);\n\nthis.drawText(\n    pet.name(),\n    0,\n    faceHeight,\n    x2,\n);\n\nif (MK.Summoning.showPetLevel) {\n    this.changeTextColor(systemColor);\n    this.drawText(\n        TextManager.levelA,\n        0,\n        faceHeight + this.lineHeight(),\n        w2,\n    );\n    this.resetTextColor();\n    this.drawText(\n        pet.level,\n        x1,\n        faceHeight + this.lineHeight(),\n        w1,\n        'right',\n    );\n}\n\nconst nParams = Math.min(\n    Math.floor(this.contentsHeight() / this.lineHeight()) - 1,\n    8,\n);\n\nfor (let i = 0; i < nParams; i++) {\n    this.changeTextColor(systemColor);\n    this.drawText(\n        TextManager.param(i),\n        x2,\n        i * this.lineHeight(),\n        w2,\n    );\n    this.resetTextColor();\n    this.drawText(\n        pet.param(i),\n        x3,\n        i * this.lineHeight(),\n        w3,\n        'right',\n    );\n}"
 * 
 * 
 * @param d
 * @text _
 * 
 * 
 * @param reserveList
 * @text Reserve List
 * 
 * 
 * @param reserveListPortraitStyle
 * @parent reserveList
 * @text Portrait Style
 * @type select
 * @option Text only
 * @option Face
 * @option Sprite
 * @option Battler Sprite
 * @default Battler Sprite
 * 
 * @param reserveListCustomDrawEval
 * @parent reserveList
 * @text JS: Reserve List Custom Draw
 * @type note
 * @default "// constants\nconst window = this;\nconst index = arguments[0];\nconst pet = arguments[1]; // might be null!\n\n// custom Code below\n"
 * 
 * 
 * @param z
 * @text _
 * 
 * @param Vocabulary
 * @text Vocabulary
 * @type struct<Vocabulary>
 * @default {"deckCommand":"Deck","reserveListHeader":"Reserve","statusHeader":"Status","emptySlot":"Empty","removePet":"Remove","modifyDecksIsForbidden":"You cannot modify this Deck right now."}
 * 
 */

/*~struct~Vocabulary:
 *
 * @param deckCommand
 * @text Main Menu: Deck Command
 * @default Deck
 * 
 * @param reserveListHeader
 * @text Reserve List Headline
 * @default Reserve
 * 
 * @param statusHeader
 * @text Status Headline
 * @default Status
 * 
 * @param emptySlot
 * @text Empty Slot
 * @default Empty
 * 
 * @param removePet
 * @text Remove Pet from Deck
 * @default Remove
 * 
 * @param modifyDecksIsForbidden
 * @text You cannot modify this Deck right now.
 * @default You cannot modify this Deck right now.
 * 
 */


var MK = MK || { };


function Scene_SummonDeck() {
    this.initialize(...arguments);
}

Scene_SummonDeck.prototype = Object.create(Scene_MenuBase.prototype);
Scene_SummonDeck.prototype.constructor = Scene_SummonDeck;


(function() {

const PLUGIN_NAME = 'MK_Summon_Deck';

const reject = (reason) => {
    const message = (
        "An Error has occurred in the Plugin %1: %2 " +
        "If the problem persists, contact the Plugin Creator."
    ).format(PLUGIN_NAME, reason);
    throw Error(message);
}

if (!PluginManager._parameters[PLUGIN_NAME.toLowerCase()]) {
    reject((
        "Please check that this plugin's filename is \"%1.js\". " +
        "Subdirectories (e.g.: js/plugins/xy/thisPlugin.js) are not allowed."
    ).format(PLUGIN_NAME));
}

const structure = (serialized, parameterName) => {
    if (!serialized) {
        reject((
            "The Plugin Parameter \"%1\" is missing. " +
            "Please check it in the Plugin Manager. It may help to re-install this Plugin (i.e.: remove, re-add)."
        ).format(parameterName));
    }
    try {
        return JSON.parse(serialized);
    
    } catch (e) {
        reject((
            "The Plugin Parameter \"%1\" is corrupted. " +
            "Please check it in the Plugin Manager. It may help to re-install this Plugin (i.e.: remove, re-add)."
        ).format(parameterName));
    }
}

const customFunction = (body, parameterName) => {
    if (!body) {
        reject((
            "The Plugin Parameter \"%1\" is missing. " +
            "Please check it in the Plugin Manager. It may help to re-install this Plugin (i.e.: remove, re-add)."
        ).format(parameterName));
    }
    try {
        return new Function(JSON.parse(body));
    
    } catch (e) {
        reject((
            "The Plugin Parameter \"%1\" contains an error and could not be interpreted. " +
            "Please check it in the Plugin Manager. It may also help to re-install this Plugin (i.e.: remove, re-add). " +
            "Cause: %2"
        ).format(parameterName, e));
    }
}

const requirePluginParameter = (value, parameterName) => {
    if (!value) {
        reject("The Plugin Parameter \"%1\" is missing. Please set it in the Plugin Manager.".format(parameterName));
    }
}

const requirePlugin = (plugin, pluginName) => {
    if (!plugin) reject("The Plugin \"%1\" is missing. Please add it to the Plugin Manager.".format(pluginName));
}

requirePlugin(MK.Summoning, 'MK_Summon');

const params = PluginManager.parameters(PLUGIN_NAME);
const isSummonDeckCommandVisible        = 'true' == params.isSummonDeckCommandVisible;
const isModifyEnabledByDefault          = 'true' == params.isModifyEnabledByDefault;
const defaultSummonDeckSize             = Number(params.summonDeckSize);
const deckLayout                        = params.deckLayout;
const deckPortraitStyle                 = params.deckPortraitStyle;
const deckListCustomBackgroundEval      = params.deckListCustomBackgroundEval && customFunction(params.deckListCustomBackgroundEval, 'Deck Custom Background');
const deckListCustomDrawEval            = params.deckListCustomDrawEval && customFunction(params.deckListCustomDrawEval, 'Deck List Custom Draw');
MK.Summoning.showPetLevel               = 'true' == params.showPetLevel;
const statusWindowCustomDrawEval        = params.statusWindowCustomDrawEval && customFunction(params.statusWindowCustomDrawEval, 'Status Window Custom Draw');
const reserveListPortraitStyle          = params.reserveListPortraitStyle;
const reserveListCustomDrawEval         = params.reserveListCustomDrawEval && customFunction(params.reserveListCustomDrawEval, 'Reserve List Custom Draw');
const onDeckModifyEval                  = params.onDeckModifyEval && customFunction(params.onDeckModifyEval, 'On Deck modify');
const Vocabulary                        = structure(params.Vocabulary, 'Vocabulary');

const faceWidth                         = ImageManager.faceWidth || Window_Base._faceWidth;
const faceHeight                        = ImageManager.faceHeight || Window_Base._faceHeight;


function Notetag() {
    this.initialize(...arguments);
}

Notetag.prototype.initialize = function(value) {
    this.value = value;
}

Notetag.of = function(object, notetag) {
    const value = object && object.meta
        ? object.meta[notetag]
        : undefined;

    if (value === null)         return new Notetag(null);
    if (value === undefined)    return new Notetag(null);
    if (value === true)         return new Notetag(true);
    if (isNaN(Number(value)))   return new Notetag(value);
    else                        return new Notetag(Number(value));
}

Notetag.prototype.exists = function() {
    return this.value !== undefined && this.value !== null;
}

Notetag.prototype.isTrue = function() {
    return this.value === true;
}

Notetag.prototype.isNumber = function() {
    return this.exists() && !isNaN(this.value);
}

Notetag.prototype.asNumber = function() {
    return this.isNumber() ? this.value : undefined;
}

Notetag.prototype.includesNumber = function(number) {
    return (
        (this.asNumber() == number) ||
        (this.value && this.value.split && this.value.split(',').map(Number).includes(number))
    );
}


// =====================================================================================
// Main Menu Overrides
// =====================================================================================

const alias_Window_MenuCommand_addMainCommands = Window_MenuCommand.prototype.addMainCommands;
Window_MenuCommand.prototype.addMainCommands = function() {
    alias_Window_MenuCommand_addMainCommands.call(this);

    if ($gameSystem.isSummonDeckCommandVisible()) {
        this.addCommand(Vocabulary.deckCommand, 'summonDeck', this.isSummonDeckCommandEnabled());
    }
}

Window_MenuCommand.prototype.isSummonDeckCommandEnabled = function() {
    return $gameParty.members().some(actor => actor.isSummoner()); // ??
}

const alias_SceneMenu_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
Scene_Menu.prototype.createCommandWindow = function() {
    alias_SceneMenu_createCommandWindow.call(this);

    this._commandWindow.setHandler('summonDeck', this.commandSummonDeck.bind(this));
}

Scene_Menu.prototype.commandSummonDeck = function() {
    SceneManager.push(Scene_SummonDeck);
}


// =====================================================================================
// Window Single Deck
// =====================================================================================

function Window_Deck() {
    this.initialize(...arguments);
}

Window_Deck.prototype = Object.create(Window_Selectable.prototype);
Window_Deck.prototype.constructor = Window_Deck;

Window_Deck.prototype.initialize = function() {
    Window_Selectable.prototype.initialize.apply(this, arguments);
    this.preloadImages();
}

Window_Deck.prototype.preloadImages = function() {
    $gameParty.pets().forEach(pet => {
        const bitmap = ImageManager.loadSvActor(pet.battlerName());
        bitmap.addLoadListener(this.refresh.bind(this));
    });
}

Window_Deck.prototype.refresh = function() {
    this.makeItemList();
    Window_Selectable.prototype.refresh.call(this);
}

Window_Deck.prototype.update = function() {
    Window_Selectable.prototype.update.call(this);

    if (this.isOpenAndActive() && this._statusWindow) {
        this._statusWindow.setActor(this.item());
    }
}

Window_Deck.prototype.maxCols = function() {
    return 'horizontal' == deckLayout ? this.maxItems() : 1;
}

Window_Deck.prototype.maxItems = function() {
    return $gameParty.summonDeckSize();
}

Window_Deck.prototype.item = function() {
    return this.itemAt(this.index());
}

Window_Deck.prototype.itemAt = function(index) {
    return this._data ? this._data[index] : null;
}

Window_Deck.prototype.itemHeight = function() {
    switch (deckPortraitStyle) {
        case 'Face':            return faceHeight + 4;
        case 'Sprite':          return 96;
        case 'Battler Sprite':  return 96;
    }
}

Window_Deck.prototype.isCurrentItemEnabled = function() {
    return $gameSystem.isModifySummonDeckAllowed();
}

Window_Deck.prototype.makeItemList = function() {
    this._data = $gameParty.summonDeck().map(id => $gameActors.actor(id));
}

Window_Deck.prototype.drawItem = function(index) {
    this.drawCustomItemBackground(index);
    
    const pet = this.itemAt(index);
    const rectangle = this.itemRect(index);
    
    if (pet) {
        if ('Face' == deckPortraitStyle) {
            this.drawFace(
                pet.faceName(),
                pet.faceIndex(),
                rectangle.width / 2 - faceWidth / 2 + rectangle.x,
                rectangle.y,
            );
        }
        if ('Sprite' == deckPortraitStyle) {
            this.drawCharacter(
                pet.characterName(),
                pet.characterIndex(),
                rectangle.width / 2 + rectangle.x,
                rectangle.height + rectangle.y,
            );
        }
        if ('Battler Sprite' == deckPortraitStyle) {
            this.drawBattlerSprite(
                pet,
                rectangle.width / 2 + rectangle.x,
                rectangle.height + rectangle.y,
            );
        }
    } else {
        this.drawEmptyText(index);
    }
    deckListCustomDrawEval && deckListCustomDrawEval.call(this, index, pet);
}

Window_Deck.prototype.drawEmptyText = function(index) {
    const rectangle = this.itemRect(index);
    
    this.changePaintOpacity(false);
    this.drawText(
        Vocabulary.emptySlot,
        rectangle.x,
        rectangle.y + rectangle.height / 2 - this.lineHeight() / 2,
        rectangle.width,
        'center',
    );
    this.changePaintOpacity(true);
}

Window_Deck.prototype.drawBattlerSprite = function(actor, x, y) {
    const bitmap    = ImageManager.loadSvActor(actor.battlerName());
    const sx        = bitmap.width / 9;
    const sy        = 0;
    const w         = bitmap.width / 9;
    const h         = bitmap.height / 6;
    const dx        = x - w / 2;
    const dy        = y - h - 2;
    this.contents.blt(bitmap, sx, sy, w, h, dx, dy);
}

Window_Deck.prototype.drawCustomItemBackground = function(index) {
    deckListCustomBackgroundEval && deckListCustomBackgroundEval.call(this, index);
}

if ('MV' == Utils.RPGMAKER_NAME) {
    Window_Deck.prototype.itemRect = function(index) {
        const rectangle = Window_Selectable.prototype.itemRect.call(this, index);
        rectangle.y += Math.floor(index / this.maxCols()) * 8;
        return rectangle;
    }
}


// =====================================================================================
// Window Reserve Pets
// =====================================================================================

function Window_ReserveList() {
    this.initialize(...arguments);
}

Window_ReserveList.prototype = Object.create(Window_Selectable.prototype);
Window_ReserveList.prototype.constructor = Window_ReserveList;

Window_ReserveList.prototype.initialize = function() {
    Window_Selectable.prototype.initialize.apply(this, arguments);
    this.preloadImages();
}

Window_ReserveList.prototype.preloadImages = function() {
    $gameParty.pets().forEach(pet => {
        const bitmap = ImageManager.loadSvActor(pet.battlerName());
        bitmap.addLoadListener(this.refresh.bind(this));
    });
}

Window_ReserveList.prototype.setActor = function(actor) {
    this._actor = actor;
}

Window_ReserveList.prototype.refresh = function() {
    this.makeItemList();
    Window_Selectable.prototype.refresh.call(this);
}

Window_ReserveList.prototype.update = function() {
    Window_Selectable.prototype.update.call(this);
    
    if (this.isOpenAndActive() && this._statusWindow) {
        this._statusWindow.setActor(this.item());
    }
}

Window_ReserveList.prototype.maxCols = function() {
    return this.contentsWidth() / Graphics.boxWidth > 0.5 ? 2 : 1;
}

Window_ReserveList.prototype.maxItems = function() {
    return this._data ? this._data.length : 0;
}

Window_ReserveList.prototype.item = function() {
    return this.itemAt(this.index());
}

Window_ReserveList.prototype.itemAt = function(index) {
    return this._data ? this._data[index] : null;
}

Window_ReserveList.prototype.itemHeight = function() {
    switch (reserveListPortraitStyle) {
        case 'Text only':       return Window_Selectable.prototype.itemHeight.call(this);
        case 'Face':            return faceHeight + 4;
        case 'Sprite':          return 96;
        case 'Battler Sprite':  return 96;
    }
}

Window_ReserveList.prototype.makeItemList = function() {
    this._data = $gameParty.pets().filter(pet => this.includes(pet));
    
    if (this.isOpenAndActive()) {
        this._data.push(null);
    }
}

Window_ReserveList.prototype.includes = function(pet) {
    return !$gameParty.summonDeck().includes(pet.actorId());
}

Window_ReserveList.prototype.drawItem = function(index) {
    const rectangle = this.itemRect(index);
    const leftRectangle = new Rectangle(
        rectangle.x,
        rectangle.y,
        rectangle.width / 3,
        rectangle.height,
    );
    const rightRectangle = new Rectangle(
        rectangle.x + leftRectangle.width,
        rectangle.y,
        rectangle.width - leftRectangle.width,
        rectangle.height,
    );
    const pet = this.itemAt(index);

    if (pet) {
        
        // Portrait
        if ('Face' == reserveListPortraitStyle) {
            this.drawFace(
                pet.faceName(),
                pet.faceIndex(),
                leftRectangle.width / 2 - faceWidth / 2 + leftRectangle.x,
                leftRectangle.y,
            );
        }
        if ('Sprite' == reserveListPortraitStyle) {
            this.drawCharacter(
                pet.characterName(),
                pet.characterIndex(),
                leftRectangle.width / 2 + leftRectangle.x,
                leftRectangle.height + leftRectangle.y,
            );
        }
        if ('Battler Sprite' == reserveListPortraitStyle) {
            this.drawBattlerSprite(
                pet,
                leftRectangle.width / 2 + leftRectangle.x,
                leftRectangle.height + leftRectangle.y,
            );
        }

        // Name
        if ('Text only' == reserveListPortraitStyle) {
            const textRectangle = 'MZ' == Utils.RPGMAKER_NAME
                ? this.itemLineRect(index)
                : this.itemRectForText(index);
            
            this.drawText(pet.name(), textRectangle.x, textRectangle.y, textRectangle.width);
        } else {
            this.drawText(
                pet.name(),
                rightRectangle.x,
                rightRectangle.y + rightRectangle.height / 2 - this.lineHeight() / 2,
                rightRectangle.width,
            );
        }

    } else {
        this.drawRemoveText(index);
    }
    reserveListCustomDrawEval && reserveListCustomDrawEval.call(this, index, pet);
}

Window_ReserveList.prototype.drawRemoveText = function(index) {
    const textRectangle = 'MZ' == Utils.RPGMAKER_NAME
        ? this.itemLineRect(index)
        : this.itemRectForText(index);
    const centeredRectangle = this.itemRect(index);
    centeredRectangle.y = centeredRectangle.y + centeredRectangle.height / 2 - this.lineHeight() / 2;
    const rectangle = 'Text only' == reserveListPortraitStyle ? textRectangle : centeredRectangle;
    const align = 'Text only' == reserveListPortraitStyle ? 'left' : 'center';
    
    this.changePaintOpacity(false);
    this.drawText(Vocabulary.removePet, rectangle.x, rectangle.y, rectangle.width, align);
    this.changePaintOpacity(true);
}

Window_ReserveList.prototype.drawBattlerSprite = function() {
    Window_Deck.prototype.drawBattlerSprite.apply(this, arguments);
}


// =====================================================================================
// Window Status
// =====================================================================================

function Window_Status() {
    this.initialize(...arguments);
}

Window_Status.prototype = Object.create(Window_Selectable.prototype);
Window_Status.prototype.constructor = Window_Status;

Window_Status.prototype.setActor = function(actor) {
    if (this._actor != actor) {
        this._actor = actor;
        this.refresh();
    }
}

Window_Status.prototype.refresh = function() {
    Window_Selectable.prototype.refresh.call(this);

    statusWindowCustomDrawEval && statusWindowCustomDrawEval.call(this, this._actor);
}


// =====================================================================================
// Window Reserve Header
// =====================================================================================

function Window_ReserveHeader() {
    this.initialize(...arguments);
}

Window_ReserveHeader.prototype = Object.create(Window_Base.prototype);
Window_ReserveHeader.prototype.constructor = Window_ReserveHeader;

Window_ReserveHeader.prototype.initialize = function() {
    Window_Base.prototype.initialize.apply(this, arguments);

    const systemColor = 'MZ' == Utils.RPGMAKER_NAME
        ? ColorManager.systemColor()
        : this.systemColor();
    
    this.changeTextColor(systemColor);
    this.drawText(
        this.title(),
        0,
        this.contentsHeight() / 2 - this.lineHeight() / 2,
        this.contentsWidth(),
        'center',
    );
    this.resetTextColor();
}

Window_ReserveHeader.prototype.title = function() {
    return Vocabulary.reserveListHeader;
}


// =====================================================================================
// Window Status Header
// =====================================================================================

function Window_StatusHeader() {
    this.initialize(...arguments);
}

Window_StatusHeader.prototype = Object.create(Window_ReserveHeader.prototype);
Window_StatusHeader.prototype.constructor = Window_StatusHeader;

Window_StatusHeader.prototype.title = function() {
    return Vocabulary.statusHeader;
}


// =====================================================================================
// Window Bottom
// =====================================================================================

function Window_Bottom() {
    this.initialize(...arguments);
}

Window_Bottom.prototype = Object.create(Window_Base.prototype);
Window_Bottom.prototype.constructor = Window_Bottom;

Window_Bottom.prototype.initialize = function() {
    Window_Base.prototype.initialize.apply(this, arguments);

    this.visible = !$gameSystem.isModifySummonDeckAllowed();

    this.drawText(
        Vocabulary.modifyDecksIsForbidden,
        0,
        this.contentsHeight() / 2 - this.lineHeight() / 2,
        this.contentsWidth(),
        'center',
    );
}


// =====================================================================================
// Scene Decks
// =====================================================================================

Scene_SummonDeck.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);

    this.createDeckWindow();
    this.createReserveStatusHeaderWindow();
    this.createReserveStatusWindow();
    this.createReserveHeaderWindow();
    this.createReserveListWindow();
    this.createBottomWindow();

    this._deckWindow._statusWindow = this._reserveStatusWindow;
    this._reserveListWindow._statusWindow = this._reserveStatusWindow;
}

Scene_SummonDeck.prototype.createDeckWindow = function() {
    const rectangle = this.deckWindowRectangle();

    if ('MZ' == Utils.RPGMAKER_NAME) {
        this._deckWindow = new Window_Deck(rectangle);
    } else {
        this._deckWindow = new Window_Deck(
            rectangle.x,
            rectangle.y,
            rectangle.width,
            rectangle.height,
        );
    }
    this._deckWindow.setHandler('ok', this.onDeckOkay.bind(this));
    this._deckWindow.setHandler('cancel', this.popScene.bind(this));
    this._deckWindow.refresh();
    this._deckWindow.activate();
    this._deckWindow.select(0);
    this.addWindow(this._deckWindow);
}

Scene_SummonDeck.prototype.createReserveHeaderWindow = function() {
    const rectangle = this.reserveHeaderWindowRectangle();

    if ('MZ' == Utils.RPGMAKER_NAME) {
        this._reserveHeaderWindow = new Window_ReserveHeader(rectangle);
    } else {
        this._reserveHeaderWindow = new Window_ReserveHeader(
            rectangle.x,
            rectangle.y,
            rectangle.width,
            rectangle.height,
        );
    }
    this.addWindow(this._reserveHeaderWindow);
}

Scene_SummonDeck.prototype.createReserveListWindow = function() {
    const rectangle = this.reserveListWindowRectangle();

    if ('MZ' == Utils.RPGMAKER_NAME) {
        this._reserveListWindow = new Window_ReserveList(rectangle);
    } else {
        this._reserveListWindow = new Window_ReserveList(
            rectangle.x,
            rectangle.y,
            rectangle.width,
            rectangle.height,
        );
    }
    this._reserveListWindow.setActor(this.actor());
    this._reserveListWindow.setHandler('ok', this.onReservePetOk.bind(this));
    this._reserveListWindow.setHandler('cancel', this.onReservePetCancel.bind(this));
    this._reserveListWindow.refresh();
    this._reserveListWindow.deselect();
    this.addWindow(this._reserveListWindow);
}

Scene_SummonDeck.prototype.createReserveStatusWindow = function() {
    const rectangle = this.reserveStatusWindowRectangle();

    if ('MZ' == Utils.RPGMAKER_NAME) {
        this._reserveStatusWindow = new Window_Status(rectangle);
    } else {
        this._reserveStatusWindow = new Window_Status(
            rectangle.x,
            rectangle.y,
            rectangle.width,
            rectangle.height,
        );
    }
    this._reserveStatusWindow.refresh();
    this.addWindow(this._reserveStatusWindow);
}

Scene_SummonDeck.prototype.createReserveStatusHeaderWindow = function() {
    const rectangle = this.statusHeaderWindowRectangle();

    if ('MZ' == Utils.RPGMAKER_NAME) {
        this._statusHeaderWindow = new Window_StatusHeader(rectangle);
    } else {
        this._statusHeaderWindow = new Window_StatusHeader(
            rectangle.x,
            rectangle.y,
            rectangle.width,
            rectangle.height,
        );
    }
    if ('horizontal' == deckLayout)
        this.addWindow(this._statusHeaderWindow);
}

Scene_SummonDeck.prototype.createBottomWindow = function() {
    const rectangle = this.bottomWindowRectangle();

    if ('MZ' == Utils.RPGMAKER_NAME) {
        this._bottomWindow = new Window_Bottom(rectangle);
    } else {
        this._bottomWindow = new Window_Bottom(
            rectangle.x,
            rectangle.y,
            rectangle.width,
            rectangle.height,
        );
    }
    this.addWindow(this._bottomWindow);
}

Scene_SummonDeck.prototype.onDeckOkay = function() {
    this._deckWindow.deactivate();
    this._reserveListWindow.activate();
    this._reserveListWindow.select(0);
    this._reserveListWindow.refresh();
}

Scene_SummonDeck.prototype.onReservePetOk = function() {
    const pet = this._reserveListWindow.item();
    
    $gameParty.modifySummonDeck(
        this._deckWindow.index(),
        pet ? pet.actorId() : null,
    );
    this._deckWindow.activate();
    this._deckWindow.refresh();
    this._reserveListWindow.deselect();
    this._reserveListWindow.deactivate();
    this._reserveListWindow.refresh();
}

Scene_SummonDeck.prototype.onReservePetCancel = function() {
    this._reserveListWindow.deactivate();
    this._reserveListWindow.deselect();
    this._reserveListWindow.refresh();
    this._deckWindow.activate();
}

Scene_SummonDeck.prototype.isModifyEnabled = function() {
    return $gameSystem.isModifySummonDeckAllowed();
}

Scene_SummonDeck.prototype.actorStatusWindowRectangle = function() {
    return new Rectangle(
        0,
        this.buttonAreaBottom ? this.buttonAreaBottom() : 0,
        Graphics.boxWidth,
        'MZ' == Utils.RPGMAKER_NAME
            ? this.calcWindowHeight(3, true)
            : new Window_Base(0, 0, 0, 0).fittingHeight(3),
    );
}

Scene_SummonDeck.prototype.deckWindowRectangle = function() {
    const y = this.buttonAreaBottom ? this.buttonAreaBottom() : 0;
    const padding = 'MZ' == Utils.RPGMAKER_NAME
        ? $gameSystem.windowPadding()
        : new Window_Base(0, 0, 0, 0).standardPadding();
    
    if ('horizontal' == deckLayout) {
        const x         = 0;
        const width     = Graphics.boxWidth;
        const height    = Window_Deck.prototype.itemHeight.call() + 2 * padding + 2;

        return new Rectangle(x, y, width, height);
    } else {
        const x         = 0;
        const width     = Graphics.boxWidth / 3;
        const height    = Graphics.boxHeight - y;

        return new Rectangle(x, y, width, height);
    }
}

Scene_SummonDeck.prototype.statusHeaderWindowRectangle = function() {
    const height = 'MZ' == Utils.RPGMAKER_NAME
        ? Scene_Base.prototype.calcWindowHeight(1)
        : new Window_Base(0, 0, 0, 0).fittingHeight(1);
    
    if ('horizontal' == deckLayout) {
        const x = Graphics.boxWidth / 2;
        const y = this._deckWindow.y + this._deckWindow.height;
        const width = Graphics.boxWidth - x;
        
        return new Rectangle(x, y, width, height);
    }
    return new Rectangle(0, 0, 0, 0);
}

Scene_SummonDeck.prototype.reserveStatusWindowRectangle = function() {
    if ('horizontal' == deckLayout) {
        const x         = this._statusHeaderWindow.x;
        const y         = this._statusHeaderWindow.y + this._statusHeaderWindow.height;
        const width     = this._statusHeaderWindow.width;
        const height    = Graphics.boxHeight - y;
        
        return new Rectangle(x, y, width, height);
    } else {
        const x         = this._deckWindow.x + this._deckWindow.width;
        const width     = Graphics.boxWidth - x;
        const height    = 'MZ' == Utils.RPGMAKER_NAME
                            ? this.calcWindowHeight(8)
                            : new Window_Base(0, 0, 0, 0).fittingHeight(8);
        const y         = Graphics.boxHeight - height;

        return new Rectangle(x, y, width, height);
    }
}

Scene_SummonDeck.prototype.reserveHeaderWindowRectangle = function() {
    const height = 'MZ' == Utils.RPGMAKER_NAME
        ? Scene_Base.prototype.calcWindowHeight(1)
        : new Window_Base(0, 0, 0, 0).fittingHeight(1);
    
    if ('horizontal' == deckLayout) {
        const x         = 0;
        const y         = this._deckWindow.y + this._deckWindow.height;
        const width     = Graphics.boxWidth - this._reserveStatusWindow.width;
        
        return new Rectangle(x, y, width, height);
    } else {
        const x         = this._reserveStatusWindow.x;
        const y         = this._deckWindow.y;
        const width     = this._reserveStatusWindow.width;

        return new Rectangle(x, y, width, height);
    }
}

Scene_SummonDeck.prototype.reserveListWindowRectangle = function() {
    if ('horizontal' == deckLayout) {
        const x         = this._reserveHeaderWindow.x;
        const y         = this._reserveHeaderWindow.y + this._reserveHeaderWindow.height;
        const width     = this._reserveHeaderWindow.width;
        const height    = Graphics.boxHeight - y;

        return new Rectangle(x, y, width, height);
    } else {
        const x         = this._reserveHeaderWindow.x;
        const y         = this._reserveHeaderWindow.y + this._reserveHeaderWindow.height;
        const width     = this._reserveHeaderWindow.width
        const height    = this._reserveStatusWindow.y - y;
        
        return new Rectangle(x, y, width, height);
    }
}

Scene_SummonDeck.prototype.bottomWindowRectangle = function() {
    const x         = this._reserveHeaderWindow.x;
    const y         = this._reserveHeaderWindow.y;
    const width     = Graphics.boxWidth - x;;
    const height    = Graphics.boxHeight - y;

    return new Rectangle(x, y, width, height);
}


// =====================================================================================
// Game Party
// =====================================================================================

Game_Party.prototype.summonDeckSize = function() {
    const i1 = typeof this._summonDeckSize !== 'undefined'
        ? this._summonDeckSize
        : defaultSummonDeckSize;

    const i2 = this.items()
        .filter(Boolean)
        .map(item => {
            const modifier = Notetag.of(item, 'Summon Deck Size').asNumber() || 0;
            return this.numItems(item) * modifier;
        })
        .reduce((a, b) => a + b, 0);
    
    const i3 = this.members()
        .filter(Boolean)
        .map(actor => actor.traitObjects()
            .map(object => Notetag.of(object, 'Summon Deck Size').asNumber())
            .filter(Boolean)
            .reduce((a, b) => a + b, 0)
        )
        .reduce((a, b) => a + b, 0);
    
    return i1 + i2 + i3;
}

Game_Party.prototype.setSummonDeckSize = function(summonDeckSize) {
    this._summonDeckSize = summonDeckSize;
}

Game_Party.prototype.summonDeck = function() {
    return (this._petIdsInDeck || [ ]).map(id => {
        const pet = $gameActors.actor(id);
        return $gameParty.allMembers().includes(pet) ? pet.actorId() : null;
    }).slice(0, this.summonDeckSize());
}

// Override
Game_Actor.prototype.includesPet = function(petOrPetId) {
    const petId = typeof petOrPetId == 'number' ? petOrPetId : petOrPetId.actorId();

    return (
        $gameParty.summonDeck().includes(petId) ||
        this.traitObjects().some(object => Notetag.of(object, 'Summon').includesNumber(petId))
    );
}

Game_Party.prototype.modifySummonDeck = function(index, petId) {
    if (index < 0 || index >= this.summonDeckSize()) {
        return;
    }
    this._petIdsInDeck = this._petIdsInDeck || [ ];
    const replacedPetId = this._petIdsInDeck[index];
    
    if (this._petIdsInDeck[index] != petId) {
        this._petIdsInDeck[index] = petId;

        onDeckModifyEval && onDeckModifyEval.call(this, index, replacedPetId, petId);
    }
}


// =====================================================================================
// Game System
// =====================================================================================

Game_System.prototype.isSummonDeckCommandVisible = function() {
    return this._summonDeckCommandVisible !== undefined
        ? this._summonDeckCommandVisible
        : isSummonDeckCommandVisible;
}

Game_System.prototype.setSummonDeckCommandVisible = function(b) {
    this._summonDeckCommandVisible = b;
}

Game_System.prototype.isModifySummonDeckAllowed = function() {
    return this._modifySummonDecksAllowed !== undefined
        ? this._modifySummonDecksAllowed
        : isModifyEnabledByDefault;
}

Game_System.prototype.setModifySummonDecksAllowed = function(b) {
    this._modifySummonDecksAllowed = b;
}

const alias_GameSystem_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    alias_GameSystem_initialize.call(this);

    this._summonDeckCommandVisible = isSummonDeckCommandVisible;
    this._modifySummonDecksAllowed = isModifyEnabledByDefault;
}


// =====================================================================================
// Plugin Manager
// =====================================================================================

if (PluginManager.registerCommand) {

    PluginManager.registerCommand(PLUGIN_NAME, 'setDeckCommandVisibility', args => {
        $gameSystem.setSummonDeckCommandVisible('show' == args.mode);
    });

    PluginManager.registerCommand(PLUGIN_NAME, 'setModifySummonDecksAllowed', args => {
        $gameSystem.setModifySummonDecksAllowed('allow' == args.mode);
    });

    PluginManager.registerCommand(PLUGIN_NAME, 'getSummonDeckSize', args => {
        $gameVariables.setValue(Number(args.variableId), $gameParty.summonDeckSize());
    });

    PluginManager.registerCommand(PLUGIN_NAME, 'setSummonDeckSize', args => {
        if ('Increase' == args.mode) {
            $gameParty.setSummonDeckSize($gameParty.summonDeckSize() + Number(args.value));
        }
        if ('Decrease' == args.mode) {
            $gameParty.setSummonDeckSize($gameParty.summonDeckSize() - Number(args.value));
        }
        if ('Set to' == args.mode) {
            $gameParty.setSummonDeckSize(Number(args.value));
        }
    });

    PluginManager.registerCommand(PLUGIN_NAME, 'hasPetInDeck', args => {
        const petId = Number(args.petId);
        const b = $gameActors.actor(petId) && $gameParty.summonDeck().includes(petId);
        $gameSwitches.setValue(Number(args.switchId), b);
    });

    PluginManager.registerCommand(PLUGIN_NAME, 'addPetToDeck', args => {
        let deckIndex;

        if ('first free Slot' == args.deckIndexMode) {
            deckIndex = $gameParty.summonDeck().findIndex(slot => !slot);
            if (deckIndex < 0) return;
        }
        if ('fixed' == args.deckIndexMode) {
            deckIndex = Number(args.deckIndexWhenFixed);
        }
        if ('by Variable' == args.deckIndexMode) {
            deckIndex = $gameVariables.value(Number(args.deckIndexByVariable));
        }
        const petId = 'fixed' == args.petIdMode
            ? Number(args.petIdWhenFixed)
            : $gameVariables.value(Number(args.petIdWhenByVariable));

        $gameParty.modifySummonDeck(deckIndex, petId);
    });

    PluginManager.registerCommand(PLUGIN_NAME, 'removePetFromDeck', args => {
        const petId = 'fixed' == args.petIdMode
            ? Number(args.petIdWhenFixed)
            : $gameVariables.value(Number(args.petIdWhenByVariable));
        
        for (let index in $gameParty.summonDeck()) {
            if ($gameParty.summonDeck()[index] == petId) {
                $gameParty.modifySummonDeck(index, null);
            }
        }
    });
}


})();
