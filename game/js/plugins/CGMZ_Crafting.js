/*:
 * @author Casper Gaming
 * @url https://www.caspergaming.com/plugins/cgmz/crafting/
 * @target MZ
 * @base CGMZ_Core
 * @orderAfter CGMZ_Core
 * @plugindesc Adds a crafting system to your game
 * @help
 * ============================================================================
 * For terms and conditions using this plugin in your game please visit:
 * https://www.caspergaming.com/terms-of-use/
 * ============================================================================
 * Become a Patron to get access to beta/alpha plugins plus other goodies!
 * https://www.patreon.com/CasperGamingRPGM
 * ============================================================================
 * Version: 1.10.1
 * ----------------------------------------------------------------------------
 * Compatibility: Only tested with my CGMZ plugins.
 * Made for RPG Maker MZ 1.9.0
 * ----------------------------------------------------------------------------
 * Description: Adds a crafting system to your game that works well with CGMZ
 * Professions. It can handle item requirements (consumed on craft), tool
 * requirements (not consumed on craft), products (produced on craft success)
 * and fail products (produced on craft fail). Recipes can be discovered by 
 * using an item or via plugin command.
 * ----------------------------------------------------------------------------
 * Documentation:
 * --------------------------Crafting In/Output--------------------------------
 * Recipes have 4 categories of items associated with them: "Products", "Fail
 * Products", "Tools", and "Ingredients".
 * - Products are items that are received by the player directly into the
 *   inventory on a successful craft.
 * - Fail Products are items that are received by the player directly into the
 *   inventory on a failed craft. This is an optional parameter.
 * - Tools are items that are required to craft the recipe, but which are NOT
 *   consumed on craft.
 * - Ingredients are items that are required to craft the recipe, and are
 *   consumed on craft.
 * --------------------------High Quality Crafts-------------------------------
 * Recipes can also have high quality craft results if high quality products
 * are set up. These are special products that occur only in the case the
 * player both succeeds the craft (did not fail the craft) and rolled a second
 * high quality check to see if the craft outcome is a high quality craft.
 *
 * High quality craft items functions similar to regular product items.
 * --------------------------Generic Item Types--------------------------------
 * Recipes can use "generic item types" for their ingredients or tools. What
 * this means is that if you need a "skillet" tool to craft an "omelet", you
 * could designate your "iron skillet" and "steel skillet" as a "skillet" type
 * item, and then either could be used to craft the "omelet".
 *
 * See note tag section for setting an item's type.
 *
 * Caution: Care should be taken if an item belongs to multiple generic
 * categories and the recipe uses multiple generic categories, as the item
 * could be double counted when calculating the amount of items the player has.
 * ----------------------------Unique Products---------------------------------
 * Unique products are products which can only be crafted up until the player
 * has the Product Unique Amount of that item in their inventory. For example,
 * you could make the Ultimate Sword which has a Product Unique Amount of 1,
 * which would mean players can only craft 1 of these swords (at least, until 
 * the first sword is no longer in their party's inventory).
 * 
 * Unique products only support item/weapon/armors. You cannot use unique
 * products to restrict currency or generic item products. Unique Products are
 * only for products, not fail products.
 * -------------------------------Note Tags------------------------------------
 * You can make items that, when used, will cause a recipe to be learned.
 * To do so, put the following tag in its notebox:
 * <cgmzrecipe:RecipeName>
 * And replace RecipeName with the name of the recipe.
 *
 * You can make weapons or armors that, when equipped, will add to a recipe
 * success chance. To do so, put the following note tags in the equip notebox:
 * <cgmzrecipetype:ProfessionName>
 * <cgmzrecipebonus:BonusAmount>
 *
 * You can make "generic" types of items/weapons/armors to be used as either
 * ingredients or tools. To do so, enter the following note tag into any
 * item/armor/weapon notebox:
 * <cgmzcraftinggeneric:GenericType,GenericType2,etc>
 * Caution: Please be aware that generics can ONLY be used for ingredients or
 *          tools!
 *
 * Note: When typing a note tag, it is CASE SENSITIVE which means that
 *       "Cooking" is not the same as "cOOking"
 * --------------------------------Filters-------------------------------------
 * This plugin has the option to allow your player to filter the current list
 * of crafting recipes they are looking at. The following filter types are
 * available:
 *
 * Category Filter
 * This filter is only available if not already using the Category window. To
 * use it, type the categories you want to be available to filter by and 
 * ensure they match the recipe's Profession parameters.
 *
 * Subcategory Filter
 * This filter is always available if enabled. To use it, you need to set up
 * which category (or all) it should show up for as well as the specific
 * recipe Subcategory it should match. To do this, use a colon ":" to separate
 * the category from the subcategory.
 *
 * For example, if you had a recipe of category (profession) "Cooking" and you
 * wanted to be able to filter that category by the subcategory "Spices", you
 * would make your filter entry: Cooking:Spices
 *
 * This supports "All" for the category where the filter subcategory will
 * always appear no matter which category is selected. For example: All:Spices
 *
 * Quality Filter
 * This filter is always available if enabled. To use it, you need to set up
 * which category (or all) it should show up for as well as the specific
 * recipe Quality it should match. To do this, use a colon ":" to separate
 * the category from the quality.
 *
 * For example, if you had a recipe of category (profession) "Cooking" and you
 * wanted to be able to filter that category by the quality "Common", you
 * would make your filter entry: Cooking:Common
 *
 * This supports "All" for the category where the filter quality will
 * always appear no matter which category is selected. For example: All:Common
 * -------------------------------Scene Keys-----------------------------------
 * The plugin command that includes scene keys help differentiate crafting
 * scenes. By default, once something is crafting, it cannot have another
 * craft of the same item start. However, if the scene key is different
 * between the two scenes, it will be recognized as a different item and you
 * can craft multiple of the same craft at once.
 *
 * Scene keys can also come in handy when checking if a specific crafting
 * station is currently crafting something. Note that it is important your
 * scene key is something unique, and should not be "crafting" or match a
 * recipe's name.
 * ----------------------------Plugin Commands---------------------------------
 * This plugin supports the following commands:
 * • Discover
 * Discovers (or undiscovers) the given recipe by name
 * 
 * • Call Scene
 * Calls the crafting scene. Specify a profession type (case sensitive) to only
 * include certain recipes in the scene.
 *
 * • Is Scene Crafting
 * Check if the scene with the provided scene key is currently crafting a
 * recipe. Sets a game switch to TRUE/FALSE based on result of the check, for
 * use in eventing.
 * 
 * • Set Description
 * Changes the given recipe's description
 * 
 * • Reinitialize
 * Reinitializes crafting data as if you had started a new game.
 * ------------------------Calling the Scene-----------------------------------
 * The JS to call the scene is: SceneManager.push(CGMZ_Scene_Crafting);
 * You can also prepare the crafting scene to show only certain recipes with:
 * SceneManager.prepareNextScene(["Type", "Type2"]);
 * -----------------------------Saved Games------------------------------------
 * This plugin partially supports saved games. Adding new recipes is supported,
 * but removing or modifying existing recipes is not supported. This is
 * because everything is saved when the game is saved. Any issues with
 * removed/modified recipes will only occur in previously saved games.
 *
 * Generic Item Info supports saved games completely, you can add/edit/remove
 * generic item information in saved games. However, the generic item type in
 * the recipe parameters does not support saved games.
 * -----------------------------Filename---------------------------------------
 * The filename for this plugin MUST remain CGMZ_Crafting.js
 * This is what it comes as when downloaded. The filename is used to load
 * parameters and execute plugin commands. If you change it, things will begin
 * behaving incorrectly and your game will probably crash. Please do not
 * rename the js file.
 * --------------------------Latest Version------------------------------------
 * Hi all, this latest version is a bug fix for instant crafting, which could
 * stop working until the crafting scene is re-entered in some cases. Before,
 * instant crafting always used the same crafting flow with just a 1 frame
 * craft time. However, now it has been converted to a true instant craft. No
 * matter how many crafts (if multicraft enabled) you select, the craft will
 * always be completed instantly without even a 1 frame wait. It still
 * calculates success and high quality per-craft if multicraft is enabled,
 * but the sound and rumble will be the failure sound if any craft fails.
 *
 * Version 1.10.1
 * - Fix bug with instant crafting stopping working until scene re-enter
 *
 * @command discover
 * @text Discover
 * @desc Discover (or undiscover) a recipe
 *
 * @arg name
 * @text Recipe Name
 * @desc The name of the recipe to discover
 *
 * @arg discover
 * @type boolean
 * @text Discover
 * @desc Whether to discover or undiscover the recipe
 * @default true
 *
 * @command Call Scene
 * @desc Calls the crafting scene
 *
 * @arg type
 * @type text[]
 * @text Type
 * @desc The type of recipes to include. Leave this blank to include all discovered recipes
 * @default []
 *
 * @arg View Only
 * @type boolean
 * @desc If true, the player will not be able to craft, only view recipe info
 * @default false
 *
 * @arg Scene Key
 * @desc Key used to differentiate from recipes crafting in other scenes
 *
 * @arg Background Preset
 * @desc [CGMZ] Scene Backgrounds preset id to use for the scene (leave blank to use default)
 *
 * @command Is Scene Crafting
 * @desc Check if a scene currently has recipes crafting
 *
 * @arg Scene Key
 * @desc The scene's key to check, this must be filled out
 *
 * @arg Game Switch
 * @default 0
 * @type switch
 * @desc The game switch to turn on or off based on the result
 *
 * @command Set Description
 * @desc Set a recipe's description
 *
 * @arg name
 * @text Recipe Name
 * @desc The name of the recipe to change description (case sensitive)
 *
 * @arg description
 * @text Description
 * @type note
 * @default ""
 * @desc The new description
 *
 * @command Reinitialize
 * @desc Resets all crafting data. Use for saved games to recognize changed data
 *
 * @param Recipes
 * @type struct<Recipe>[]
 * @default []
 * @desc Set up recipes here
 *
 * @param Generic Items
 * @type struct<GenericItem>[]
 * @default []
 * @desc Set up generic items here
 *
 * @param Categories
 * @type struct<CategoryData>[]
 * @default []
 * @desc Set up crafting categories here
 *
 * @param Crafting Options
 *
 * @param Instant Crafting
 * @parent Crafting Options
 * @type boolean
 * @desc If true, will not show the progress window and will instantly craft everything
 * @default false
 *
 * @param Automatic Learn
 * @parent Crafting Options
 * @type boolean
 * @desc If true, recipes will automatically be discovered when the player gets the items for a recipe
 * @default false
 *
 * @param Allow Multicraft
 * @parent Crafting Options
 * @type boolean
 * @desc If true, the scene will ask the player how many they want to craft
 * @default false
 *
 * @param Wait For Finish
 * @parent Crafting Options
 * @type boolean
 * @desc If true, the user will not be able to do anything until their current craft finishes
 * @default false
 *
 * @param Window Options
 *
 * @param Allow Filter
 * @parent Window Options
 * @type boolean
 * @desc If true, will allow the player to set filters for the recipes shown
 * @default true
 *
 * @param Transparent Windows
 * @parent Window Options
 * @type boolean
 * @desc Whether the crafting windows are transparent or not
 * @default false
 *
 * @param Disable Touch UI Space
 * @parent Window Options
 * @type boolean
 * @desc If true, will not leave space for Touch UI buttons if Touch UI is disabled
 * @default false
 *
 * @param ScrollSpeed
 * @parent Window Options
 * @type number
 * @min 0
 * @desc speed at which the recipe window display scrolls (if needed)
 * @default 1
 *
 * @param ScrollWait
 * @parent Window Options
 * @type number
 * @min 0
 * @desc amount of time (in frames) to wait before beginning to scroll
 * @default 300
 *
 * @param Scroll Deceleration
 * @parent Window Options
 * @type number
 * @min 0.01
 * @max 0.99
 * @decimals 2
 * @desc Rate of deceleration after letting go of touch
 * @default 0.92
 *
 * @param Auto Scroll
 * @parent Window Options
 * @type boolean
 * @desc Determine if the display window should automatically scroll after so long of no user input
 * @default true
 *
 * @param Category Sort Order
 * @parent Window Options
 * @type text[]
 * @desc The order categories appear in when all are showing
 * @default []
 *
 * @param List Window Width
 * @parent Window Options
 * @type number
 * @min 0
 * @max 100
 * @desc % of the screen width the list window takes up
 * @default 33
 *
 * @param Multicraft Window Width
 * @parent Window Options
 * @type number
 * @min 0
 * @max 100
 * @desc % of the screen width the multicraft window takes up
 * @default 50
 *
 * @param List Window On Right
 * @parent Window Options
 * @type boolean
 * @default false
 * @desc If true, the list window will be on the right side of the screen
 *
 * @param List Windowskin
 * @parent Window Options
 * @type file
 * @dir img/
 * @desc The windowskin to use for the Crafting list window. Leave blank to use default.
 *
 * @param Category Windowskin
 * @parent Window Options
 * @type file
 * @dir img/
 * @desc The windowskin to use for the Crafting category window. Leave blank to use default.
 *
 * @param Display Windowskin
 * @parent Window Options
 * @type file
 * @dir img/
 * @desc The windowskin to use for the Crafting display window. Leave blank to use default.
 *
 * @param Progress Windowskin
 * @parent Window Options
 * @type file
 * @dir img/
 * @desc The windowskin to use for the Crafting progress window. Leave blank to use default.
 *
 * @param Confirm Windowskin
 * @parent Window Options
 * @type file
 * @dir img/
 * @desc The windowskin to use for the Crafting confirm window. Leave blank to use default.
 *
 * @param Multicraft Windowskin
 * @parent Window Options
 * @type file
 * @dir img/
 * @desc The windowskin to use for the Crafting multicraft window. Leave blank to use default.
 *
 * @param List Padding
 * @parent Window Options
 * @type number
 * @min -1
 * @default -1
 * @desc Padding in the list window. -1 = default
 *
 * @param Category Padding
 * @parent Window Options
 * @type number
 * @min -1
 * @default -1
 * @desc Padding in the category window. -1 = default
 *
 * @param Display Padding
 * @parent Window Options
 * @type number
 * @min -1
 * @default -1
 * @desc Padding in the display window. -1 = default
 *
 * @param Progress Padding
 * @parent Window Options
 * @type number
 * @min -1
 * @default -1
 * @desc Padding in the progress window. -1 = default
 *
 * @param Confirm Padding
 * @parent Window Options
 * @type number
 * @min -1
 * @default -1
 * @desc Padding in the confirm window. -1 = default
 *
 * @param Multicraft Padding
 * @parent Window Options
 * @type number
 * @min -1
 * @default -1
 * @desc Padding in the multicraft window. -1 = default
 *
 * @param List Back Opacity
 * @parent Window Options
 * @type number
 * @min -1
 * @default -1
 * @desc Back Opacity in the list window. -1 = default
 *
 * @param Category Back Opacity
 * @parent Window Options
 * @type number
 * @min -1
 * @default -1
 * @desc Back Opacity in the category window. -1 = default
 *
 * @param Display Back Opacity
 * @parent Window Options
 * @type number
 * @min -1
 * @default -1
 * @desc Back Opacity in the display window. -1 = default
 *
 * @param Progress Back Opacity
 * @parent Window Options
 * @type number
 * @min -1
 * @default -1
 * @desc Back Opacity in the progress window. -1 = default
 *
 * @param Confirm Back Opacity
 * @parent Window Options
 * @type number
 * @min -1
 * @default -1
 * @desc Back Opacity in the confirm window. -1 = default
 *
 * @param Multicraft Back Opacity
 * @parent Window Options
 * @type number
 * @min -1
 * @default -1
 * @desc Back Opacity in the multicraft window. -1 = default
 *
 * @param Category Tone
 * @parent Window Options
 * @type struct<Tone>
 * @default {"Red":"-256","Green":"0","Blue":"0"}
 * @desc Windowskin tone. Set red to -256 to not use.
 *
 * @param List Tone
 * @parent Window Options
 * @type struct<Tone>
 * @default {"Red":"-256","Green":"0","Blue":"0"}
 * @desc Windowskin tone. Set red to -256 to not use.
 *
 * @param Display Tone
 * @parent Window Options
 * @type struct<Tone>
 * @default {"Red":"-256","Green":"0","Blue":"0"}
 * @desc Windowskin tone. Set red to -256 to not use.
 *
 * @param Progress Tone
 * @parent Window Options
 * @type struct<Tone>
 * @default {"Red":"-256","Green":"0","Blue":"0"}
 * @desc Windowskin tone. Set red to -256 to not use.
 *
 * @param Confirm Tone
 * @parent Window Options
 * @type struct<Tone>
 * @default {"Red":"-256","Green":"0","Blue":"0"}
 * @desc Windowskin tone. Set red to -256 to not use.
 *
 * @param Multicraft Tone
 * @parent Window Options
 * @type struct<Tone>
 * @default {"Red":"-256","Green":"0","Blue":"0"}
 * @desc Windowskin tone. Set red to -256 to not use.
 *
 * @param Show Ingredient Amount
 * @parent Window Options
 * @type boolean
 * @default true
 * @desc Show the current amount of ingredients the player has?
 *
 * @param Show Tool Amount
 * @parent Window Options
 * @type boolean
 * @default false
 * @desc Show the current amount of tools the player has?
 *
 * @param Show Product Amount
 * @parent Window Options
 * @type boolean
 * @default false
 * @desc Show the current amount of the product the player has?
 *
 * @param Show Unique Product Amount
 * @parent Window Options
 * @type boolean
 * @default false
 * @desc Show the maximum amount of unique product a player can make?
 *
 * @param Show Fail Product Amount
 * @parent Window Options
 * @type boolean
 * @default false
 * @desc Show the current amount of the product the player has?
 *
 * @param Show High Quality Product Amount
 * @parent Window Options
 * @type boolean
 * @default false
 * @desc Show the current amount of the product the player has?
 *
 * @param Hide Uncraftable Recipes
 * @parent Window Options
 * @type boolean
 * @default false
 * @desc If true, recipes the player cannot craft will not show even if they learned them
 *
 * @param Show Confirm Window
 * @parent Window Options
 * @type boolean
 * @desc Determine if there should be an additional confirmation window before starting to craft
 * @default false
 *
 * @param Show Progress Percentage
 * @parent Window Options
 * @desc Whether to show the progress % text or not
 * @type boolean
 * @default true
 *
 * @param Show Progress Time Remaining
 * @parent Window Options
 * @desc If true, the progress window will show time remaining.
 * @type boolean
 * @default false
 *
 * @param Progress Decimals
 * @parent Window Options
 * @desc Number of decimals to show on the progress percentage, if displayed
 * @type number
 * @default 2
 *
 * @param Show Category Window
 * @parent Window Options
 * @desc Whether to use the category window or not
 * @type boolean
 * @default true
 *
 * @param Display Window Info
 * @parent Window Options
 * @type select[]
 * @option Name
 * @option Image
 * @option Times Crafted
 * @option Success Rate
 * @option High Quality Rate
 * @option Quality
 * @option Subcategory
 * @option Exp
 * @option Level Required
 * @option Current Level
 * @option Description
 * @option Products
 * @option Tools
 * @option Ingredients
 * @option Fail Products
 * @option High Quality Products
 * @option Info Header
 * @option Description Header
 * @option Product Header
 * @option Tool Header
 * @option Ingredient Header
 * @option Fail Product Header
 * @option High Quality Product Header
 * @option Blank Line
 * @option Custom Space
 * @desc Determines the order and what info the display window shows.
 * @default ["Name","Image","Times Crafted","Success Rate","Quality","Exp","Level Required","Current Level","Description","Product Header","Products","Tool Header","Tools","Ingredient Header","Ingredients"]
 *
 * @param Custom Space
 * @parent Window Options
 * @desc Amount of blank vertical space to leave when Custom Space display parameter is used
 * @type number
 * @default 6
 * 
 * @param Category Filter Options
 * @parent Window Options
 * @desc Category filter options. Must match recipe profession exactly.
 * @type text[]
 * @default []
 *
 * @param Subcategory Filter Options
 * @parent Window Options
 * @desc Subcategory filter options. Must match recipe subcategory exactly.
 * @type text[]
 * @default []
 *
 * @param Quality Filter Options
 * @parent Window Options
 * @desc Quality filter options. Must match recipe quality exactly.
 * @type text[]
 * @default []
 *
 * @param Filter Button Width
 * @parent Window Options
 * @desc Width of the filter touch UI button (in multiples of 48)
 * @type number
 * @default 1
 *
 * @param Filter Button Offset
 * @parent Window Options
 * @desc Filter Button index on the button sheet
 * @type number
 * @default 4
 *
 * @param Filter Key
 * @parent Window Options
 * @desc Key that when pressed will start the filter flow
 * @default f
 *
 * @param Filter Gamepad
 * @parent Window Options
 * @desc Gamepad button that when pressed will start the filter flow
 * @type select
 * @option A
 * @value 0
 * @option B
 * @value 1
 * @option X
 * @value 2
 * @option Y
 * @value 3
 * @option LB
 * @value 4
 * @option RB
 * @value 5
 * @option LT
 * @value 6
 * @option RT
 * @value 7
 * @option Back / Select
 * @value 8
 * @option Start
 * @value 9
 * @option Left Stick
 * @value 10
 * @option Right Stick
 * @value 11
 * @option Dpad Up
 * @value 12
 * @option Dpad Down
 * @value 13
 * @option Dpad Left
 * @value 14
 * @option Dpad Right
 * @value 15
 * @default 5
 * 
 * @param Text Options
 *
 * @param Description Alignment
 * @parent Text Options
 * @type select
 * @option left
 * @option center
 * @option right
 * @desc The alignment of the description text.
 * @default left
 *
 * @param Success Rate Text
 * @parent Text Options
 * @desc Text to show to describe the success rate of a recipe
 * @default Success Rate: 
 *
 * @param High Quality Rate Text
 * @parent Text Options
 * @desc Text to show to describe the high quality rate of a recipe
 * @default High Quality Rate: 
 *
 * @param Quality Label Text
 * @parent Text Options
 * @desc Text to show to describe the quality of a recipe
 * @default Quality: 
 *
 * @param Subcategory Label Text
 * @parent Text Options
 * @desc Text to show to describe the subcategory of a recipe
 * @default Specialization: 
 *
 * @param Times Crafted Text
 * @parent Text Options
 * @desc Text to show to describe the amount of times a recipe has been crafted
 * @default Times Crafted: 
 *
 * @param Experience Text
 * @parent Text Options
 * @desc Text to show to describe the experience gained for crafting the recipe (Requires CGMZ Professions)
 * @default Exp Gain: 
 *
 * @param Level Requirement Text
 * @parent Text Options
 * @desc Text to show to describe the level required to craft the recipe (Requires CGMZ Professions)
 * @default Level Req: 
 *
 * @param Current Level Text
 * @parent Text Options
 * @desc Text to show to describe the current level of the required profession (Requires CGMZ Professions)
 * @default Level: 
 *
 * @param Level Abbreviation Text
 * @parent Text Options
 * @desc Text to abbreviate level requirement to (Requires CGMZ Professions)
 * @default Lv.
 *
 * @param Amount X Text
 * @parent Text Options
 * @desc Text to show to describe the amount x
 * @default x
 *
 * @param Craft Confirm Text
 * @parent Text Options
 * @desc Text to show to describe the command for crafting
 * @default Craft
 *
 * @param Craft Cancel Text
 * @parent Text Options
 * @desc Text to show to describe the command for cancelling a craft
 * @default Cancel
 *
 * @param Progress Text
 * @parent Text Options
 * @desc Text to show to describe the progress of the currently crafting recipe
 * @default Progress: 
 *
 * @param Success Text
 * @parent Text Options
 * @desc Text to show to describe a successful craft
 * @default Craft Success!
 *
 * @param Failure Text
 * @parent Text Options
 * @desc Text to show to describe a failed craft
 * @default Craft Failed!
 *
 * @param High Quality Text
 * @parent Text Options
 * @desc Text to show to describe a high quality craft
 * @default High Quality Craft!
 *
 * @param Craft Quantity Text
 * @parent Text Options
 * @desc Text to show to describe the amount the player wants to craft
 * @default Amount to Craft:
 *
 * @param Label Text Color
 * @parent Text Options
 * @desc The color of the text labels in the crafting scene
 * @type color
 * @default 16
 *
 * @param Progress Color1
 * @parent Text Options
 * @desc First color of the progress bar using Windowskin colors
 * @type color
 * @default 28
 *
 * @param Progress Color2
 * @parent Text Options
 * @desc Second color of the progress bar using Windowskin colors
 * @type color
 * @default 29
 *
 * @param Success Color
 * @parent Text Options
 * @desc Color of the Successful Craft Text using Windowskin colors
 * @type color
 * @default 29
 *
 * @param High Quality Color
 * @parent Text Options
 * @desc Color of the High Quality Craft Text
 * @type color
 * @default 29
 *
 * @param Failure Color
 * @parent Text Options
 * @desc Color of the Failure Craft Text using Windowskin colors
 * @type color
 * @default 18
 *
 * @param Header Color 1
 * @parent Text Options
 * @desc Color 1 of the gradient lines in headers
 * @type color
 * @default 1
 *
 * @param Header Color 2
 * @parent Text Options
 * @desc Color 2 of the gradient lines in headers
 * @type color
 * @default 0
 *
 * @param Info Header Text
 * @parent Text Options
 * @desc Text in the Info Header of display window
 * @default Info
 *
 * @param Desc Header Text
 * @parent Text Options
 * @desc Text in the Description Header of display window
 * @default Description
 *
 * @param Ingredient Header Text
 * @parent Text Options
 * @desc Text in the Ingredient Header of display window
 * @default Ingredients
 *
 * @param Tool Header Text
 * @parent Text Options
 * @desc Text in the Tool Header of display window
 * @default Tools
 *
 * @param Product Header Text
 * @parent Text Options
 * @desc Text in the Product Header of display window
 * @default Products
 *
 * @param Fail Product Header Text
 * @parent Text Options
 * @desc Text in the Fail Product Header of display window
 * @default Fail Products
 *
 * @param High Quality Product Header Text
 * @parent Text Options
 * @desc Text in the High Quality Product Header of display window
 * @default High Quality Products
 *
 * @param Unique Text
 * @parent Text Options
 * @desc Text to show for unique products
 * @default Unique (%unique)
 *
 * @param No Recipe Text
 * @parent Text Options
 * @desc Text to show when the scene has no recipes
 * @default Keep playing the game to learn more recipes!
 *
 * @param Percent Text
 * @parent Text Options
 * @desc Text to show after progress percentage
 * @default  %
 *
 * @param Sec Text
 * @parent Text Options
 * @desc Text to show when there are seconds remaining on progress bar
 * @default sec
 *
 * @param Min Text
 * @parent Text Options
 * @desc Text to show when there are minutes remaining on progress bar
 * @default min
 *
 * @param Hr Text
 * @parent Text Options
 * @desc Text to show when there are hours remaining on progress bar
 * @default hr
 *
 * @param Remove Filter Text
 * @parent Text Options
 * @desc Text to show for the Remove Filter option
 * @default Remove Filter
 *
 * @param Category Filter Text
 * @parent Text Options
 * @desc Text to show for the Category Filter option
 * @default Category
 *
 * @param Subcategory Filter Text
 * @parent Text Options
 * @desc Text to show for the Subcategory Filter option
 * @default Subcategory
 *
 * @param Quality Filter Text
 * @parent Text Options
 * @desc Text to show for the Quality Filter option
 * @default Quality
 *
 * @param Integrations
 *
 * @param Learn Toast
 * @parent Integrations
 * @type struct<Toast>
 * @default {"Display":"true","Sound Effect":"{\"Name\":\"\",\"Volume\":\"90\",\"Pitch\":\"100\",\"Pan\":\"0\"}","Width":"0","Height":"0","Tone":"{\"Red\":\"-256\",\"Green\":\"0\",\"Blue\":\"0\"}","Background Style":"Window","Windowskin":""}
 * @desc Toast window to show when learning a recipe (requires CGMZ ToastManager)
 *
 * @param Learn Toast Text
 * @parent Integrations
 * @default Learned Recipe: 
 * @desc Text to describe a recently learned recipe in the toast window (requires CGMZ ToastManager)
 *
 * @param Complete Toast
 * @parent Integrations
 * @type struct<Toast>
 * @default {"Display":"true","Sound Effect":"{\"Name\":\"\",\"Volume\":\"90\",\"Pitch\":\"100\",\"Pan\":\"0\"}","Width":"0","Height":"0","Tone":"{\"Red\":\"-256\",\"Green\":\"0\",\"Blue\":\"0\"}","Background Style":"Window","Windowskin":""}
 * @desc Toast window to show when crafting finishes (requires CGMZ ToastManager)
 *
 * @param Complete Toast Text
 * @parent Integrations
 * @default Craft Complete:
 * @desc Text to describe a recently finished craft (requires CGMZ ToastManager)
 *
 * @param Always Award Exp
 * @parent Integrations
 * @type boolean
 * @default true
 * @desc Award exp even on recipe failure? (requires CGMZ Professions)
 *
 * @param Hide High Level Recipes
 * @parent Integrations
 * @type boolean
 * @default true
 * @desc Hide recipes the player does not meet level requirements for?
 *
 * @param Close On Level Up
 * @parent Integrations
 * @type boolean
 * @desc Close the crafting scene on profession level up?
 * @default false
 *
 * @param Fail Rumble
 * @parent Integrations
 * @type struct<Rumble>
 * @default {"Duration":"0","Weak Magnitude":"1.00","Strong Magnitude":"1.00","Start Delay":"0"}
 * @desc [CGMZ] Rumble to play when successful craft finishes
 *
 * @param Success Rumble
 * @parent Integrations
 * @type struct<Rumble>
 * @default {"Duration":"0","Weak Magnitude":"1.00","Strong Magnitude":"1.00","Start Delay":"0"}
 * @desc [CGMZ] Rumble to play when successful craft finishes
 *
 * @param Scene Background
 * @parent Integrations
 * @desc [CGMZ] Scene Backgrounds preset id to use for the crafting scene
*/
/*~struct~Recipe:
 * @param Name
 * @desc The name of the recipe.
 *
 * @param Display Name
 * @desc The displayed name of the recipe (if different than name).
 *
 * @param Products
 * @type struct<Item>[]
 * @default []
 * @desc The items produced by crafting the recipe
 *
 * @param Fail Products
 * @type struct<Item>[]
 * @default []
 * @desc The items produced by a failed craft of this recipe
 *
 * @param Ingredients
 * @type struct<Item>[]
 * @default []
 * @desc The items required to craft the recipe that are consumed on craft
 *
 * @param Tools
 * @type struct<Item>[]
 * @default []
 * @desc The items required to craft the recipe that are not consumed on craft
 * 
 * @param Discovered
 * @type boolean
 * @default false
 * @desc Determine whether the recipe is discovered at the beginning of the game.
 *
 * @param Picture
 * @type file
 * @dir img/pictures
 * @desc The image to use for the recipe in place of the big icon (recommended size: 64x64). Leave blank to not use.
 * 
 * @param Icon
 * @type icon
 * @default 0
 * @desc Icon index to use for the recipe
 *
 * @param Description
 * @type note
 * @default ""
 * @desc Recipe description
 *
 * @param Success Rate
 * @type number
 * @min 1
 * @max 100
 * @default 100
 * @desc The % chance that the craft will succeed.
 *
 * @param Time
 * @type number
 * @min 1
 * @default 120
 * @desc The time (in frames, 60f = 1sec) it takes to craft the recipe
 *
 * @param Success Rate Per Level
 * @type number
 * @min -100
 * @max 100
 * @default 0
 * @desc The change (additive) in % chance that the craft will succeed per level beyond the level requirement. (Requires CGMZ Professions)
 *
 * @param Experience
 * @type number
 * @min 1
 * @default 1
 * @desc The amount of experience to award for crafting this recipe (Requires CGMZ Professions)
 *
 * @param Profession
 * @desc The profession name which the recipe belongs to if using CGMZ Professions. The type of recipe if not using CGMZ Professions.
 *
 * @param Subcategory
 * @desc If you want, you can add a subcategory to the recipe. This does not affect how the recipe functions.
 *
 * @param Quality
 * @desc If you want, you can add a quality to the recipe. This does not affect how the recipe functions.
 *
 * @param Level Requirement
 * @type number
 * @default 1
 * @min 0
 * @desc Profession level required to craft (Requires CGMZ Professions)
 *
 * @param Craft Sound Effect
 * @type struct<SoundEffect>
 * @default {"Name":"","Volume":"90","Pitch":"100","Pan":"0"}
 * @desc The sound effect to play when crafting the recipe
 *
 * @param Fail Sound Effect
 * @type struct<SoundEffect>
 * @default {"Name":"","Volume":"90","Pitch":"100","Pan":"0"}
 * @desc The sound effect to play when crafting fails
 *
 * @param Success Sound Effect
 * @type struct<SoundEffect>
 * @default {"Name":"","Volume":"90","Pitch":"100","Pan":"0"}
 * @desc The sound effect to play when crafting succeeds
 *
 * @param Toast Learn Sound Effect
 * @type struct<SoundEffect>
 * @default {"Name":"","Volume":"90","Pitch":"100","Pan":"0"}
 * @desc The sound effect to play when displaying a toast window for the recipe (Requires CGMZ ToastManager)
 *
 * @param Toast Complete Sound Effect
 * @type struct<SoundEffect>
 * @default {"Name":"","Volume":"90","Pitch":"100","Pan":"0"}
 * @desc The sound effect to play when displaying a toast window for the recipe (Requires CGMZ ToastManager)
 *
 * @param Disable Learn Toast
 * @type boolean
 * @default false
 * @desc Do not show the learn toast for only this recipe?
 *
 * @param Disable Complete Toast
 * @type boolean
 * @default false
 * @desc Do not show the complete toast for only this recipe?
 *
 * @param Disable Autodiscover
 * @type boolean
 * @default false
 * @desc If true, this recipe must be manually discovered.
 *
 * @param Learn On Craft
 * @type text[]
 * @default []
 * @desc Recipe name(s) to learn when this recipe is crafted
 *
 * @param Learn On Craft Chance
 * @type number[]
 * @default []
 * @min 1
 * @max 100
 * @desc Percentage of learning the corresponding recipe in Learn On Craft param
 *
 * @param Unlearn On Craft
 * @type text[]
 * @default []
 * @desc Recipe name(s) to unlearn when this recipe is crafted
 *
 * @param Unlearn On Craft Chance
 * @type number[]
 * @default []
 * @min 1
 * @max 100
 * @desc Percentage of unlearning the corresponding recipe in Unlearn On Craft param
 *
 * @param Success Variable
 * @type variable
 * @default 0
 * @desc Variable ID which, on successful craft, will increase by 1
 *
 * @param Product Unique Amount
 * @type number
 * @default 0
 * @desc Amount of the Product items in inventory before the recipe can no longer be crafted
 *
 * @param High Quality Products
 * @type struct<Item>[]
 * @default []
 * @desc The items produced by crafting the recipe when a high quality craft occurs
 *
 * @param High Quality Chance
 * @type number
 * @min 0
 * @max 100
 * @default 0
 * @desc The chance a craft will instead be high quality
 *
 * @param High Quality Chance Per Level
 * @type number
 * @min -100
 * @max 100
 * @default 0
 * @desc The change (additive) in % chance that the craft will be high quality per level beyond the level requirement. (Requires CGMZ Professions)
 */
/*~struct~Item:
 * @param Item
 * @type item
 * @default 0
 * @desc The item to use. If you set this, do not set armor/weapon.
 *
 * @param Weapon
 * @type weapon
 * @default 0
 * @desc The weapon to use. If you set this, do not set armor/item.
 *
 * @param Armor
 * @type armor
 * @default 0
 * @desc The item to use. If you set this, do not set item/weapon.
 *
 * @param Gold
 * @type boolean
 * @default false
 * @desc True to set a gold amount.
 *
 * @param Generic
 * @desc A generic type to use. Only for use in Ingredients/Tools! Ignored for Products.
 * 
 * @param Amount
 * @type number
 * @default 1
 * @desc The amount of this item needed
 *
 * @param Currency Id
 * @desc [CGMZ] Currency System currency id if Gold is set
*/
/*~struct~GenericItem:
 * @param Type
 * @desc The id/type of the generic item. Used internally to refer to this generic item.
 *
 * @param Display Name
 * @desc The displayed name of the generic item
 *
 * @param Icon Index
 * @type icon
 * @default 0
 * @desc The icon to use to represent the generic item
*/
/*~struct~SoundEffect:
 * @param Name
 * @type file
 * @dir audio/se
 * @desc The sound effect file to play
 *
 * @param Volume
 * @type number
 * @min 0
 * @max 100
 * @default 90
 * @desc The volume of the sound effect
 *
 * @param Pitch
 * @type number
 * @min 50
 * @max 150
 * @default 100
 * @desc The pitch of the sound effect
 *
 * @param Pan
 * @type number
 * @min -100
 * @max 100
 * @default 0
 * @desc The pitch of the sound effect
*/
/*~struct~CategoryData:
 * @param Id
 * @desc The id (profession) of the category
 *
 * @param Command Text
 * @desc The text to show for this category in the category window
*/
/*~struct~Tone:
 * @param Red
 * @type number
 * @min -256
 * @max 255
 * @desc Amount of red in the tone. Set to -256 to not use tone.
 * @default 0
 *
 * @param Green
 * @type number
 * @min -255
 * @max 255
 * @desc Amount of green in the tone
 * @default 0
 *
 * @param Blue
 * @type number
 * @min -255
 * @max 255
 * @desc Amount of blue in the tone
 * @default 0
*/
/*~struct~Rumble:
 * @param Duration
 * @type number
 * @min 0
 * @max 5000
 * @default 0
 * @desc The duration (in ms) of the rumble
 *
 * @param Weak Magnitude
 * @type number
 * @decimals 2
 * @min 0.00
 * @max 1.00
 * @default 1.00
 * @desc The weak magnitude of the rumble
 *
 * @param Strong Magnitude
 * @type number
 * @decimals 2
 * @min 0.00
 * @max 1.00
 * @default 1.00
 * @desc The strong magnitude of the rumble
 *
 * @param Start Delay
 * @type number
 * @min 0
 * @max 4800
 * @default 0
 * @desc The delay (in ms) before the rumble starts
*/
/*~struct~Toast:
 * @param Display
 * @type boolean
 * @default true
 * @desc Determines if this toast is displayed
 * 
 * @param Sound Effect
 * @type struct<SoundEffect>
 * @default {"Name":"","Volume":"90","Pitch":"100","Pan":"0"}
 * @desc Sound effect (fallback) options for the toast. Set SE name to blank to not use.
 *
 * @param Width
 * @type number
 * @default 0
 * @min 0
 * @desc Width of the toast. Set to 0 to use default toast width.
 *
 * @param Height
 * @type number
 * @default 0
 * @min 0
 * @desc Height of the toast. Set to 0 to use default toast height.
 *
 * @param Tone
 * @type struct<Tone>
 * @default {"Red":"-256","Green":"0","Blue":"0"}
 * @desc Windowskin tone. Set red to -256 to not use.
 *
 * @param Background Style
 * @type select
 * @option Window
 * @option Dim
 * @option Transparent
 * @desc Window background style. Same as Show Text event command.
 * @default Window
 *
 * @param Windowskin
 * @type file
 * @dir img
 * @desc Windowskin to use. Set as blank to use toast default
*/
Imported.CGMZ_Crafting = true;
CGMZ.Versions["Crafting"] = "1.10.1";
CGMZ.Crafting = {};
CGMZ.Crafting.parameters = PluginManager.parameters('CGMZ_Crafting');
CGMZ.Crafting.Recipes = CGMZ_Utils.parseJSON(CGMZ.Crafting.parameters["Recipes"], [], "[CGMZ] Crafting", "Your Recipes parameter had invalid JSON and could not be read.");
CGMZ.Crafting.Generics = CGMZ_Utils.parseJSON(CGMZ.Crafting.parameters["Generic Items"], [], "[CGMZ] Crafting", "Your Generic Items parameter had invalid JSON and could not be read.");
CGMZ.Crafting.DisplayWindowInfo = CGMZ_Utils.parseJSON(CGMZ.Crafting.parameters["Display Window Info"], [], "[CGMZ] Crafting", "Your Display Window Info parameter had invalid JSON and could not be read.");
CGMZ.Crafting.Categories = CGMZ_Utils.parseJSON(CGMZ.Crafting.parameters["Categories"], [], "[CGMZ] Crafting", "Your Categories parameter had invalid JSON and could not be read.");
CGMZ.Crafting.CategorySortOrder = CGMZ_Utils.parseJSON(CGMZ.Crafting.parameters["Category Sort Order"], [], "[CGMZ] Crafting", "Your Category Sort Order parameter had invalid JSON and could not be read.").reverse();
CGMZ.Crafting.CategoryFilterOptions = CGMZ_Utils.parseJSON(CGMZ.Crafting.parameters["Category Filter Options"], [], "[CGMZ] Crafting", "Your Category Filter Options parameter had invalid JSON and could not be read.");
CGMZ.Crafting.SubcategoryFilterOptions = CGMZ_Utils.parseJSON(CGMZ.Crafting.parameters["Subcategory Filter Options"], [], "[CGMZ] Crafting", "Your Subcategory Filter Options parameter had invalid JSON and could not be read.");
CGMZ.Crafting.QualityFilterOptions = CGMZ_Utils.parseJSON(CGMZ.Crafting.parameters["Quality Filter Options"], [], "[CGMZ] Crafting", "Your Quality Filter Options parameter had invalid JSON and could not be read.");
CGMZ.Crafting.SceneBackground = CGMZ.Crafting.parameters["Scene Background"];
CGMZ.Crafting.SuccessRateText = CGMZ.Crafting.parameters["Success Rate Text"];
CGMZ.Crafting.HighQualityRateText = CGMZ.Crafting.parameters["High Quality Rate Text"];
CGMZ.Crafting.TimesCraftedText = CGMZ.Crafting.parameters["Times Crafted Text"];
CGMZ.Crafting.ExpText = CGMZ.Crafting.parameters["Experience Text"];
CGMZ.Crafting.LevelReqText = CGMZ.Crafting.parameters["Level Requirement Text"];
CGMZ.Crafting.CurrentLevelText = CGMZ.Crafting.parameters["Current Level Text"];
CGMZ.Crafting.LevelAbbrText = CGMZ.Crafting.parameters["Level Abbreviation Text"];
CGMZ.Crafting.ProgressText = CGMZ.Crafting.parameters["Progress Text"];
CGMZ.Crafting.SuccessText = CGMZ.Crafting.parameters["Success Text"];
CGMZ.Crafting.HighQualityText = CGMZ.Crafting.parameters["High Quality Text"];
CGMZ.Crafting.FailureText = CGMZ.Crafting.parameters["Failure Text"];
CGMZ.Crafting.InfoHeaderText = CGMZ.Crafting.parameters["Info Header Text"];
CGMZ.Crafting.DescHeaderText = CGMZ.Crafting.parameters["Desc Header Text"];
CGMZ.Crafting.IngredientHeaderText = CGMZ.Crafting.parameters["Ingredient Header Text"];
CGMZ.Crafting.ToolHeaderText = CGMZ.Crafting.parameters["Tool Header Text"];
CGMZ.Crafting.ProductHeaderText = CGMZ.Crafting.parameters["Product Header Text"];
CGMZ.Crafting.FailProductHeaderText = CGMZ.Crafting.parameters["Fail Product Header Text"];
CGMZ.Crafting.HighQualityProductHeaderText = CGMZ.Crafting.parameters["High Quality Product Header Text"];
CGMZ.Crafting.DescriptionAlignment = CGMZ.Crafting.parameters["Description Alignment"];
CGMZ.Crafting.CraftConfirmText = CGMZ.Crafting.parameters["Craft Confirm Text"];
CGMZ.Crafting.CraftCancelText = CGMZ.Crafting.parameters["Craft Cancel Text"];
CGMZ.Crafting.QualityLabelText = CGMZ.Crafting.parameters["Quality Label Text"];
CGMZ.Crafting.SubcategoryLabelText = CGMZ.Crafting.parameters["Subcategory Label Text"];
CGMZ.Crafting.ListWindowskin = CGMZ.Crafting.parameters["List Windowskin"];
CGMZ.Crafting.DisplayWindowskin = CGMZ.Crafting.parameters["Display Windowskin"];
CGMZ.Crafting.ProgressWindowskin = CGMZ.Crafting.parameters["Progress Windowskin"];
CGMZ.Crafting.ConfirmWindowskin = CGMZ.Crafting.parameters["Confirm Windowskin"];
CGMZ.Crafting.MulticraftWindowskin = CGMZ.Crafting.parameters["Multicraft Windowskin"];
CGMZ.Crafting.CategoryWindowskin = CGMZ.Crafting.parameters["Category Windowskin"];
CGMZ.Crafting.LearnToastText = CGMZ.Crafting.parameters["Learn Toast Text"];
CGMZ.Crafting.CompleteToastText = CGMZ.Crafting.parameters["Complete Toast Text"];
CGMZ.Crafting.UniqueText = CGMZ.Crafting.parameters["Unique Text"];
CGMZ.Crafting.NoRecipeText = CGMZ.Crafting.parameters["No Recipe Text"];
CGMZ.Crafting.AmountXText = CGMZ.Crafting.parameters["Amount X Text"];
CGMZ.Crafting.CraftQuantityText = CGMZ.Crafting.parameters["Craft Quantity Text"];
CGMZ.Crafting.SecText = CGMZ.Crafting.parameters["Sec Text"];
CGMZ.Crafting.MinText = CGMZ.Crafting.parameters["Min Text"];
CGMZ.Crafting.HrText = CGMZ.Crafting.parameters["Hr Text"];
CGMZ.Crafting.PercentText = CGMZ.Crafting.parameters["Percent Text"];
CGMZ.Crafting.RemoveFilterText = CGMZ.Crafting.parameters["Remove Filter Text"];
CGMZ.Crafting.CategoryFilterText = CGMZ.Crafting.parameters["Category Filter Text"];
CGMZ.Crafting.SubcategoryFilterText = CGMZ.Crafting.parameters["Subcategory Filter Text"];
CGMZ.Crafting.QualityFilterText = CGMZ.Crafting.parameters["Quality Filter Text"];
CGMZ.Crafting.FilterKey = CGMZ.Crafting.parameters["Filter Key"];
CGMZ.Crafting.ScrollDeceleration = parseFloat(CGMZ.Crafting.parameters["Scroll Deceleration"]);
CGMZ.Crafting.LabelColor = Number(CGMZ.Crafting.parameters["Label Text Color"]);
CGMZ.Crafting.ScrollSpeed = Number(CGMZ.Crafting.parameters["ScrollSpeed"]);
CGMZ.Crafting.ScrollWait = Number(CGMZ.Crafting.parameters["ScrollWait"]);
CGMZ.Crafting.ProgressColor1 = Number(CGMZ.Crafting.parameters["Progress Color1"]);
CGMZ.Crafting.ProgressColor2 = Number(CGMZ.Crafting.parameters["Progress Color2"]);
CGMZ.Crafting.FailureColor = Number(CGMZ.Crafting.parameters["Failure Color"]);
CGMZ.Crafting.SuccessColor = Number(CGMZ.Crafting.parameters["Success Color"]);
CGMZ.Crafting.HighQualityColor = Number(CGMZ.Crafting.parameters["High Quality Color"]);
CGMZ.Crafting.ListWindowWidth = Number(CGMZ.Crafting.parameters["List Window Width"]);
CGMZ.Crafting.MulticraftWindowWidth = Number(CGMZ.Crafting.parameters["Multicraft Window Width"]);
CGMZ.Crafting.HeaderColor1 = Number(CGMZ.Crafting.parameters["Header Color 1"]);
CGMZ.Crafting.HeaderColor2 = Number(CGMZ.Crafting.parameters["Header Color 2"]);
CGMZ.Crafting.ListPadding = Number(CGMZ.Crafting.parameters["List Padding"]);
CGMZ.Crafting.CategoryPadding = Number(CGMZ.Crafting.parameters["Category Padding"]);
CGMZ.Crafting.DisplayPadding = Number(CGMZ.Crafting.parameters["Display Padding"]);
CGMZ.Crafting.ProgressPadding = Number(CGMZ.Crafting.parameters["Progress Padding"]);
CGMZ.Crafting.ConfirmPadding = Number(CGMZ.Crafting.parameters["Confirm Padding"]);
CGMZ.Crafting.MulticraftPadding = Number(CGMZ.Crafting.parameters["Multicraft Padding"]);
CGMZ.Crafting.ListBackOpacity = Number(CGMZ.Crafting.parameters["List Back Opacity"]);
CGMZ.Crafting.CategoryBackOpacity = Number(CGMZ.Crafting.parameters["Category Back Opacity"]);
CGMZ.Crafting.DisplayBackOpacity = Number(CGMZ.Crafting.parameters["Display Back Opacity"]);
CGMZ.Crafting.ProgressBackOpacity = Number(CGMZ.Crafting.parameters["Progress Back Opacity"]);
CGMZ.Crafting.ConfirmBackOpacity = Number(CGMZ.Crafting.parameters["Confirm Back Opacity"]);
CGMZ.Crafting.MulticraftBackOpacity = Number(CGMZ.Crafting.parameters["Multicraft Back Opacity"]);
CGMZ.Crafting.ProgressDecimals = Number(CGMZ.Crafting.parameters["Progress Decimals"]);
CGMZ.Crafting.FilterButtonOffset = Number(CGMZ.Crafting.parameters["Filter Button Offset"]);
CGMZ.Crafting.FilterButtonWidth = Number(CGMZ.Crafting.parameters["Filter Button Width"]);
CGMZ.Crafting.FilterGamepad = Number(CGMZ.Crafting.parameters["Filter Gamepad"]);
CGMZ.Crafting.CustomSpace = Number(CGMZ.Crafting.parameters["Custom Space"]);
CGMZ.Crafting.AutoScroll = (CGMZ.Crafting.parameters["Auto Scroll"] === "true");
CGMZ.Crafting.AlwaysAwardExp = (CGMZ.Crafting.parameters["Always Award Exp"] === "true");
CGMZ.Crafting.HideHighLevelRecipes = (CGMZ.Crafting.parameters["Hide High Level Recipes"] === "true");
CGMZ.Crafting.ShowProgressPercentage = (CGMZ.Crafting.parameters["Show Progress Percentage"] === "true");
CGMZ.Crafting.ShowIngredientAmount = (CGMZ.Crafting.parameters["Show Ingredient Amount"] === "true");
CGMZ.Crafting.ShowToolAmount = (CGMZ.Crafting.parameters["Show Tool Amount"] === "true");
CGMZ.Crafting.ShowProductAmount = (CGMZ.Crafting.parameters["Show Product Amount"] === "true");
CGMZ.Crafting.ShowFailProductAmount = (CGMZ.Crafting.parameters["Show Fail Product Amount"] === "true");
CGMZ.Crafting.ShowHighQualityProductAmount = (CGMZ.Crafting.parameters["Show High Quality Product Amount"] === "true");
CGMZ.Crafting.WindowTransparency = (CGMZ.Crafting.parameters["Transparent Windows"] === "true");
CGMZ.Crafting.PopSceneOnLevel = (CGMZ.Crafting.parameters["Close On Level Up"] === "true");
CGMZ.Crafting.ListWindowRight = (CGMZ.Crafting.parameters["List Window On Right"] === "true");
CGMZ.Crafting.ShowConfirmationWindow = (CGMZ.Crafting.parameters["Show Confirm Window"] === "true");
CGMZ.Crafting.DisableTouchUISpace = (CGMZ.Crafting.parameters["Disable Touch UI Space"] === "true");
CGMZ.Crafting.InstantCrafting = (CGMZ.Crafting.parameters["Instant Crafting"] === "true");
CGMZ.Crafting.ShowUniqueProductAmount = (CGMZ.Crafting.parameters["Show Unique Product Amount"] === "true");
CGMZ.Crafting.HideUncraftableRecipes = (CGMZ.Crafting.parameters["Hide Uncraftable Recipes"] === "true");
CGMZ.Crafting.ShowCategoryWindow = (CGMZ.Crafting.parameters["Show Category Window"] === "true");
CGMZ.Crafting.AutomaticLearn = (CGMZ.Crafting.parameters["Automatic Learn"] === "true");
CGMZ.Crafting.AllowMulticraft = (CGMZ.Crafting.parameters["Allow Multicraft"] === "true");
CGMZ.Crafting.ShowProgressTimeRemaining = (CGMZ.Crafting.parameters["Show Progress Time Remaining"] === "true");
CGMZ.Crafting.AllowFilter = (CGMZ.Crafting.parameters["Allow Filter"] === "true");
CGMZ.Crafting.WaitForFinish = (CGMZ.Crafting.parameters["Wait For Finish"] === "true");
CGMZ.Crafting.CategoryTone = CGMZ_Utils.parseToneJSON(CGMZ.Crafting.parameters["Category Tone"], "[CGMZ] Crafting");
CGMZ.Crafting.ListTone = CGMZ_Utils.parseToneJSON(CGMZ.Crafting.parameters["List Tone"], "[CGMZ] Crafting");
CGMZ.Crafting.ProgressTone = CGMZ_Utils.parseToneJSON(CGMZ.Crafting.parameters["Progress Tone"], "[CGMZ] Crafting");
CGMZ.Crafting.DisplayTone = CGMZ_Utils.parseToneJSON(CGMZ.Crafting.parameters["Display Tone"], "[CGMZ] Crafting");
CGMZ.Crafting.ConfirmTone = CGMZ_Utils.parseToneJSON(CGMZ.Crafting.parameters["Confirm Tone"], "[CGMZ] Crafting");
CGMZ.Crafting.MulticraftTone = CGMZ_Utils.parseToneJSON(CGMZ.Crafting.parameters["Multicraft Tone"], "[CGMZ] Crafting");
CGMZ.Crafting.SuccessRumble = CGMZ_Utils.parseRumbleJSON(CGMZ.Crafting.parameters["Success Rumble"], "[CGMZ] Crafting");
CGMZ.Crafting.FailRumble = CGMZ_Utils.parseRumbleJSON(CGMZ.Crafting.parameters["Fail Rumble"], "[CGMZ] Crafting");
CGMZ.Crafting.LearnToast = CGMZ_Utils.parseToast(CGMZ.Crafting.parameters["Learn Toast"], "[CGMZ] Crafting");
CGMZ.Crafting.CompleteToast = CGMZ_Utils.parseToast(CGMZ.Crafting.parameters["Complete Toast"], "[CGMZ] Crafting");
//=============================================================================
// CGMZ_Recipe
//-----------------------------------------------------------------------------
// Store and manage recipe data
//=============================================================================
function CGMZ_Recipe() {
	this.initialize.apply(this, arguments);
}
//-----------------------------------------------------------------------------
// Initialize Recipe
//-----------------------------------------------------------------------------
CGMZ_Recipe.prototype.initialize = function(recipe) {
	this._name = recipe.Name;
	this._discovered = (recipe.Discovered === 'true');
	this._profession = recipe.Profession;
	this._description = CGMZ_Utils.parseJSON(recipe.Description, "", "[CGMZ] Crafting", "Could not parse recipe description: " + this._name);
	this._timesCrafted = 0;
};
//-----------------------------------------------------------------------------
// Change discovered status of a recipe
//-----------------------------------------------------------------------------
CGMZ_Recipe.prototype.changeDiscoveredStatus = function(discovered) {
	this._discovered = discovered;
};
//-----------------------------------------------------------------------------
// Set new description
//-----------------------------------------------------------------------------
CGMZ_Recipe.prototype.setDescription = function(description) {
	this._description = description;
};
//-----------------------------------------------------------------------------
// Set up learn toast (Requires CGMZ ToastManager)
//-----------------------------------------------------------------------------
CGMZ_Recipe.prototype.setupLearnToast = function() {
	const recipeTemp = $cgmzTemp.getRecipeTempData(this._name);
	const toast = JSON.parse(JSON.stringify(CGMZ.Crafting.LearnToast));
	if(!recipeTemp || recipeTemp.disableLearnToast || !toast || !Imported.CGMZ_ToastManager) return;
	toast.isText = true;
	toast.lineOne = CGMZ.Crafting.LearnToastText;
	toast.lineTwo = recipeTemp.getName();
	toast.lineOneAlignment = 'center';
	toast.lineTwoAlignment = 'center';
	toast.lineOneColor = 0;
	toast.lineTwoColor = 0;
	if(recipeTemp.toastLearnSE?.name) toast.SE = recipeTemp.toastLearnSE;
	$cgmzTemp.createNewToast(toast);
};
//-----------------------------------------------------------------------------
// Set up complete toast (Requires CGMZ ToastManager)
//-----------------------------------------------------------------------------
CGMZ_Recipe.prototype.setupCompleteToast = function() {
	const recipeTemp = $cgmzTemp.getRecipeTempData(this._name);
	const toast = JSON.parse(JSON.stringify(CGMZ.Crafting.CompleteToast));
	if(!recipeTemp || recipeTemp.disableCompleteToast || !toast || !Imported.CGMZ_ToastManager) return;
	toast.isText = true;
	toast.lineOne = CGMZ.Crafting.CompleteToastText;
	toast.lineTwo = recipeTemp.getName();
	toast.lineOneAlignment = 'center';
	toast.lineTwoAlignment = 'center';
	toast.lineOneColor = 0;
	toast.lineTwoColor = 0;
	if(recipeTemp.toastCompleteSE?.name) toast.SE = recipeTemp.toastCompleteSE;
	$cgmzTemp.createNewToast(toast);
};
//-----------------------------------------------------------------------------
// Perform the craft
//-----------------------------------------------------------------------------
CGMZ_Recipe.prototype.doCraft = function(success, hq = false) {
	const tempData = $cgmzTemp.getRecipeTempData(this._name);
	this.takeItems(tempData.ingredients);
	if(Imported.CGMZ_Professions) this.awardExp(success);
	if(success) {
		this._timesCrafted++;
		this.learnRecipesOnCraft();
		this.unlearnRecipesOnCraft();
		const products = (hq) ? tempData.hqproducts : tempData.products;
		this.giveItems(products);
		const recipeTemp = $cgmzTemp.getRecipeTempData(this._name);
		if(recipeTemp && recipeTemp.successVariable) {
			const val = $gameVariables.value(recipeTemp.successVariable);
			$gameVariables.setValue(recipeTemp.successVariable, val + 1);
		}
	}
	else {
		this.giveItems(tempData.failProducts);
	}
};
//-----------------------------------------------------------------------------
// Handling when craft starts
//-----------------------------------------------------------------------------
CGMZ_Recipe.prototype.startCraft = function() {
	const tempData = $cgmzTemp.getRecipeTempData(this._name);
	this.takeItems(tempData.ingredients);
};
//-----------------------------------------------------------------------------
// Handling when craft finishes
//-----------------------------------------------------------------------------
CGMZ_Recipe.prototype.finishCraft = function(success, hq = false) {
	const tempData = $cgmzTemp.getRecipeTempData(this._name);
	if(Imported.CGMZ_Professions) this.awardExp(success);
	if(success) {
		this._timesCrafted++;
		this.learnRecipesOnCraft();
		this.unlearnRecipesOnCraft();
		const products = (hq) ? tempData.hqproducts : tempData.products;
		this.giveItems(products);
		const recipeTemp = $cgmzTemp.getRecipeTempData(this._name);
		if(recipeTemp && recipeTemp.successVariable) {
			const val = $gameVariables.value(recipeTemp.successVariable);
			$gameVariables.setValue(recipeTemp.successVariable, val + 1);
		}
	} else {
		this.giveItems(tempData.failProducts);
	}
};
//-----------------------------------------------------------------------------
// Check if recipe can be crafted
//-----------------------------------------------------------------------------
CGMZ_Recipe.prototype.canCraft = function() {
	if(!this.meetsLevelRequirements()) return false;
	if(!this.hasItemsNeeded()) return false;
	if(!this.meetsUniqueItemCheck()) return false;
	return this._discovered;
};
//-----------------------------------------------------------------------------
// Check if profession level requirements are met
//-----------------------------------------------------------------------------
CGMZ_Recipe.prototype.meetsLevelRequirements = function() {
	if(!Imported.CGMZ_Professions) return true;
	const profession = $cgmz.getProfession(this._profession);
	const tempData = $cgmzTemp.getRecipeTempData(this._name);
	if(profession) {
		return tempData.levelRequirement <= profession.getBuffedLevel();
	}
	return true;
};
//-----------------------------------------------------------------------------
// Check if player has the items required to craft
//-----------------------------------------------------------------------------
CGMZ_Recipe.prototype.hasItemsNeeded = function() {
	const tempData = $cgmzTemp.getRecipeTempData(this._name);
	for(const tool of tempData.tools) {
		if(tool.Type === 'currency') {
			if(Imported.CGMZ_CurrencySystem && tool.ID) {
				const currency = $cgmz.getCurrency(tool.ID);
				if(currency && currency.amount() < tool.Amount) return false;
			} else {
				if($gameParty.gold() < tool.Amount) return false;
			}
		} else if(tool.Type === 'generic') {
			const numItems = $cgmzTemp.calculateTotalNumItemsOfGenericType(tool.GenericCategory);
			if(numItems < tool.Amount) return false;
		} else {
			const item = CGMZ_Utils.lookupItem(tool.Type, tool.ID);
			if(item) {
				if($gameParty.numItems(item) < tool.Amount) return false;
			}
		}
	}
	for(const ingredient of tempData.ingredients) {
		if(ingredient.Type === 'currency') {
			if(Imported.CGMZ_CurrencySystem && ingredient.ID) {
				const currency = $cgmz.getCurrency(ingredient.ID);
				if(currency && currency.amount() < ingredient.Amount) return false;
			} else {
				if($gameParty.gold() < ingredient.Amount) return false;
			}
		} else if(ingredient.Type === 'generic') {
			const numItems = $cgmzTemp.calculateTotalNumItemsOfGenericType(ingredient.GenericCategory);
			if(numItems < ingredient.Amount) return false;
		} else {
			const item = CGMZ_Utils.lookupItem(ingredient.Type, ingredient.ID);
			if(item) {
				if($gameParty.numItems(item) < ingredient.Amount) return false;
			}
		}
	}
	return true;
};
//-----------------------------------------------------------------------------
// Check if player already has the unique items
//-----------------------------------------------------------------------------
CGMZ_Recipe.prototype.meetsUniqueItemCheck = function() {
	const recipeTemp = $cgmzTemp.getRecipeTempData(this._name);
	if(!recipeTemp || !recipeTemp.productUniqueAmount) return true;
	for(const product of recipeTemp.products) {
		if(product.Type === 'currency' || product.Type === 'generic') continue; // currency and generic cannot be unique
		const item = CGMZ_Utils.lookupItem(product.Type, product.ID);
		if(item) {
			if($gameParty.numItems(item) >= recipeTemp.productUniqueAmount) return false;
		}
	}
	return true;
};
//-----------------------------------------------------------------------------
// Take away ingredients needed to craft
//-----------------------------------------------------------------------------
CGMZ_Recipe.prototype.takeItems = function(itemArray) {
	for(const itemObj of itemArray) {
		if(itemObj.Type === 'currency') {
			if(Imported.CGMZ_CurrencySystem && itemObj.ID) {
				const currency = $cgmz.getCurrency(itemObj.ID);
				if(currency) {
					currency.loseCurrency(itemObj.Amount);
				}
			} else {
				$gameParty.loseGold(itemObj.Amount);
			}
		} else if(itemObj.Type === 'generic') {
			let amtToLose = itemObj.Amount;
			for(const item of $gameParty.allItems()) {
				if(amtToLose <= 0) break;
				const genericType = itemObj.GenericCategory;
				if(item.meta && item.meta.cgmzcraftinggeneric && item.meta.cgmzcraftinggeneric.split(",").includes(genericType)) {
					const itemAmt = $gameParty.numItems(item);
					(amtToLose > itemAmt) ? $gameParty.loseItem(item, itemAmt, true) : $gameParty.loseItem(item, amtToLose, true);
					amtToLose -= itemAmt;
				}
			}
		} else {
			const item = CGMZ_Utils.lookupItem(itemObj.Type, itemObj.ID);
			if(item) {
				$gameParty.loseItem(item, itemObj.Amount, false);
			}
		}
	}
};
//-----------------------------------------------------------------------------
// Give item products generated from craft
//-----------------------------------------------------------------------------
CGMZ_Recipe.prototype.giveItems = function(itemArray) {
	for(const itemObj of itemArray) {
		if(itemObj.Type === 'currency') {
			if(Imported.CGMZ_CurrencySystem && itemObj.ID) {
				const currency = $cgmz.getCurrency(itemObj.ID);
				if(currency) currency.gainCurrency(itemObj.Amount);
			} else {
				$gameParty.gainGold(itemObj.Amount);
			}
		} else {
			const item = CGMZ_Utils.lookupItem(itemObj.Type, itemObj.ID);
			if(item) {
				$gameParty.gainItem(item, itemObj.Amount, false);
			}
		}
	}
};
//-----------------------------------------------------------------------------
// Learn a recipe and show toast if applicable
//-----------------------------------------------------------------------------
CGMZ_Recipe.prototype.learn = function() {
	this.changeDiscoveredStatus(true);
	this.setupLearnToast();
};
//-----------------------------------------------------------------------------
// Unlearn a recipe
//-----------------------------------------------------------------------------
CGMZ_Recipe.prototype.unlearn = function() {
	this.changeDiscoveredStatus(false);
};
//-----------------------------------------------------------------------------
// Award profession Exp if applicable
//-----------------------------------------------------------------------------
CGMZ_Recipe.prototype.awardExp = function(success) {
	if(success || CGMZ.Crafting.AlwaysAwardExp) {
		const tempData = $cgmzTemp.getRecipeTempData(this._name);
		if(tempData) $cgmz.changeProfessionExp(this._profession, "+", tempData.experience);
	}
};
//-----------------------------------------------------------------------------
// Try to learn applicable recipes on craft
//-----------------------------------------------------------------------------
CGMZ_Recipe.prototype.learnRecipesOnCraft = function() {
	const recipeTemp = $cgmzTemp.getRecipeTempData(this._name);
	if(!recipeTemp) return;
	for(const obj of recipeTemp.learnOnCraft) {
		const recipe = $cgmz.getRecipe(obj.recipe);
		const roll = Math.random()*100;
		if(recipe && !recipe._discovered && roll <= obj.odds) {
			recipe.learn();
		}
	}
};
//-----------------------------------------------------------------------------
// Try to unlearn applicable recipes on craft
//-----------------------------------------------------------------------------
CGMZ_Recipe.prototype.unlearnRecipesOnCraft = function() {
	const recipeTemp = $cgmzTemp.getRecipeTempData(this._name);
	if(!recipeTemp) return;
	for(const obj of recipeTemp.unlearnOnCraft) {
		const recipe = $cgmz.getRecipe(obj.recipe);
		const roll = Math.random()*100;
		if(recipe && recipe._discovered && roll <= obj.odds) {
			recipe.unlearn();
		}
	}
};
//-----------------------------------------------------------------------------
// Calculate the success rate of the recipe
//-----------------------------------------------------------------------------
CGMZ_Recipe.prototype.calculateSuccessRate = function() {
	const tempData = $cgmzTemp.getRecipeTempData(this._name);
	let successRate = tempData.successRate;
	if(Imported.CGMZ_Professions) {
		const profession = $cgmz.getProfession(this._profession);
		if(profession) {
			successRate += tempData.addedSuccessPerLevel * (profession.getBuffedLevel() - tempData.levelRequirement);
		}
		for(const actor of $gameParty.members()) {
			for(const equip of actor.equips()) {
				if(equip && equip.meta && equip.meta.cgmzrecipetype === this._profession) {
					successRate += Number(equip.meta.cgmzrecipebonus) || 0;
				}
			}
		}
	}
	return Math.max(0.0, Math.min(successRate, 100.0));
};
//-----------------------------------------------------------------------------
// Calculate the high quality rate of the recipe
//-----------------------------------------------------------------------------
CGMZ_Recipe.prototype.calculateHighQualityRate = function() {
	const tempData = $cgmzTemp.getRecipeTempData(this._name);
	let successRate = tempData.hqChance;
	if(Imported.CGMZ_Professions) {
		const profession = $cgmz.getProfession(this._profession);
		if(profession) {
			successRate += tempData.hqChancePerLevel * (profession.getBuffedLevel() - tempData.levelRequirement);
		}
	}
	return Math.max(0.0, Math.min(successRate, 100.0));
};
//-----------------------------------------------------------------------------
// Check if this recipe can be autodiscovered
//-----------------------------------------------------------------------------
CGMZ_Recipe.prototype.canAutodiscover = function() {
	const recipeTemp = $cgmzTemp.getRecipeTempData(this._name);
	if(this._discovered) return false;
	if(recipeTemp.disableAutodiscover) return false;
	if(!this.hasItemsNeeded()) return false;
	return true;
};
//=============================================================================
// CGMZ_RecipeTemp
//-----------------------------------------------------------------------------
// Store and manage unsaved recipe data
//=============================================================================
function CGMZ_RecipeTemp() {
	this.initialize.apply(this, arguments);
}
//-----------------------------------------------------------------------------
// Initialize Recipe
//-----------------------------------------------------------------------------
CGMZ_RecipeTemp.prototype.initialize = function(recipe) {
	this._name = recipe.Name;
	this._displayName = recipe["Display Name"];
	this.subcategory = recipe.Subcategory;
	this.quality = recipe.Quality;
	this.image = recipe.Picture;
	this.disableLearnToast = (recipe["Disable Learn Toast"] === 'true');
	this.disableCompleteToast = (recipe["Disable Complete Toast"] === 'true');
	this.disableAutodiscover = (recipe["Disable Autodiscover"] === 'true');
	this.time = Number(recipe.Time);
	this.successRate = Number(recipe["Success Rate"]);
	this.experience = Number(recipe.Experience);
	this.productUniqueAmount = Number(recipe["Product Unique Amount"]);
	this.successVariable = Number(recipe["Success Variable"]);
	this.iconIndex = Number(recipe.Icon);
	this.addedSuccessPerLevel = Number(recipe["Success Rate Per Level"]);
	this.hqChance = Number(recipe["High Quality Chance"]);
	this.hqChancePerLevel = Number(recipe["High Quality Chance Per Level"]);
	this.levelRequirement = Number(recipe["Level Requirement"]);
	this.toastLearnSE = CGMZ_Utils.parseSoundEffectJSON(recipe["Toast Learn Sound Effect"], "[CGMZ] Crafting");
	this.toastCompleteSE = CGMZ_Utils.parseSoundEffectJSON(recipe["Toast Complete Sound Effect"], "[CGMZ] Crafting");
	this.craftSE = CGMZ_Utils.parseSoundEffectJSON(recipe["Craft Sound Effect"], "[CGMZ] Crafting");
	this.failSE = CGMZ_Utils.parseSoundEffectJSON(recipe["Fail Sound Effect"], "[CGMZ] Crafting");
	this.successSE = CGMZ_Utils.parseSoundEffectJSON(recipe["Success Sound Effect"], "[CGMZ] Crafting");
	this.setupLearnOnCraft(recipe["Learn On Craft"], recipe["Learn On Craft Chance"]);
	this.setupUnlearnOnCraft(recipe["Unlearn On Craft"], recipe["Unlearn On Craft Chance"]);
	this.products = [];
	this.hqproducts = [];
	this.failProducts = [];
	this.ingredients = [];
	this.tools = [];
	this.setupArray(this.products, recipe.Products, false);
	this.setupArray(this.ingredients, recipe.Ingredients, true);
	this.setupArray(this.tools, recipe.Tools, true);
	this.setupArray(this.failProducts, recipe["Fail Products"], false);
	this.setupArray(this.hqproducts, recipe["High Quality Products"], false);
};
//-----------------------------------------------------------------------------
// Set up the array for possible crafting recipes learned on successful craft
//-----------------------------------------------------------------------------
CGMZ_RecipeTemp.prototype.setupLearnOnCraft = function(recipesJSON, oddsJSON) {
	const recipes = CGMZ_Utils.parseJSON(recipesJSON, [], "[CGMZ] Crafting", "Your recipe '" + this._name + "' had invalid JSON in the Learn On Craft parameter. This parameter could not be read.");
	const odds = CGMZ_Utils.parseJSON(oddsJSON, [], "[CGMZ] Crafting", "Your recipe '" + this._name + "' had invalid JSON in the Learn On Craft Chance parameter. This parameter could not be read.");
	this.learnOnCraft = [];
	for(let i = 0; i < recipes.length; i++) {
		const obj = {recipe: recipes[i], odds: Number(odds[i])};
		this.learnOnCraft.push(obj);
	}
};
//-----------------------------------------------------------------------------
// Set up the array for possible crafting recipes learned on successful craft
//-----------------------------------------------------------------------------
CGMZ_RecipeTemp.prototype.setupUnlearnOnCraft = function(recipesJSON, oddsJSON) {
	const recipes = CGMZ_Utils.parseJSON(recipesJSON, [], "[CGMZ] Crafting", "Your recipe '" + this._name + "' had invalid JSON in the Unlearn On Craft parameter. This parameter could not be read.");
	const odds = CGMZ_Utils.parseJSON(oddsJSON, [], "[CGMZ] Crafting", "Your recipe '" + this._name + "' had invalid JSON in the Unlearn On Craft Chance parameter. This parameter could not be read.");
	this.unlearnOnCraft = [];
	for(let i = 0; i < recipes.length; i++) {
		const obj = {recipe: recipes[i], odds: Number(odds[i])};
		this.unlearnOnCraft.push(obj);
	}
};
//-----------------------------------------------------------------------------
// Set up the arrays for items associated with the recipe.
//-----------------------------------------------------------------------------
CGMZ_RecipeTemp.prototype.setupArray = function(array, recipeJSONArray, allowGenerics) {
	const recipeArray = CGMZ_Utils.parseJSON(recipeJSONArray, [], "[CGMZ] Crafting", "Your recipe '" + this._name + "' had invalid JSON in parameter: product, ingredient, tool, high quality product, or fail product. Skipping");
	for(const recipeJSON of recipeArray) {
		const item = CGMZ_Utils.parseJSON(recipeJSON, null, "[CGMZ] Crafting", "Could not parse a product, ingredient, tool, high quality product, or fail product parameter in recipe '" + this._name + "'");
		if(!item) continue;
		if(Number(item.Item) !== 0) {
			item.ID = Number(item.Item);
			item.Type = "item";
		} else if(Number(item.Weapon) !== 0) {
			item.ID = Number(item.Weapon);
			item.Type = "weapon";
		} else if(Number(item.Armor) !== 0) {
			item.ID = Number(item.Armor);
			item.Type = "armor";
		} else if(allowGenerics && item.Generic) {
			item.ID = 0;
			item.Type = "generic";
			item.GenericCategory = item.Generic;
		} else {
			item.ID = item["Currency Id"];
			item.Type = "currency";
		}
		item.Amount = Number(item.Amount);
		array.push(item);
	}
};
//-----------------------------------------------------------------------------
// Set up the array for possible crafting recipes learned on successful craft
//-----------------------------------------------------------------------------
CGMZ_RecipeTemp.prototype.getName = function() {
	return (this._displayName) ? this._displayName : this._name;
};
//=============================================================================
// CGMZ_CraftingGenericItem
//-----------------------------------------------------------------------------
// Object representing a generic item, not saved
//=============================================================================
function CGMZ_CraftingGenericItem() {
	this.initialize.apply(this, arguments);
}
//-----------------------------------------------------------------------------
// Initialize generic item data
//-----------------------------------------------------------------------------
CGMZ_CraftingGenericItem.prototype.initialize = function(generic) {
	this._type = generic.Type;
	this._name = generic["Display Name"];
	this._iconIndex = Number(generic["Icon Index"]);
};
//=============================================================================
// CGMZ_CraftingCategoryData
//-----------------------------------------------------------------------------
// Object representing a crafting category, not saved
//=============================================================================
function CGMZ_CraftingCategoryData() {
	this.initialize.apply(this, arguments);
}
//-----------------------------------------------------------------------------
// Initialize category data
//-----------------------------------------------------------------------------
CGMZ_CraftingCategoryData.prototype.initialize = function(category) {
	this.id = category.Id;
	this.commandText = category["Command Text"];
};
//=============================================================================
// CGMZ
//-----------------------------------------------------------------------------
// Manage recipe data
//=============================================================================
//-----------------------------------------------------------------------------
// Alias. Also initialize recipe data
//-----------------------------------------------------------------------------
const alias_CGMZ_Crafting_createPluginData = CGMZ_Core.prototype.createPluginData;
CGMZ_Core.prototype.createPluginData = function() {
	alias_CGMZ_Crafting_createPluginData.call(this);
	this.initializeRecipeData();
};
//-----------------------------------------------------------------------------
// Initialize recipe data
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.initializeRecipeData = function(reinitialize = false) {
	if(!this._recipes || reinitialize) {
		this.setupRecipeVariables();
	}
	for(const recipeJSON of CGMZ.Crafting.Recipes) {
		const recipeParsed = CGMZ_Utils.parseJSON(recipeJSON, null, "[CGMZ] Crafting", "One of your recipes had invalid JSON and could not be read, skipping.");
		if(!recipeParsed) continue;
		const recipe = new CGMZ_Recipe(recipeParsed);
		const existingRecipe = this.getRecipe(recipe._name);
		if(!existingRecipe) {
			this._recipes.push(recipe);
		}
	}
};
//-----------------------------------------------------------------------------
// Initialize recipe variables
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.setupRecipeVariables = function() {
	this._recipes = [];
};
//-----------------------------------------------------------------------------
// Alias. Check for new recipes after loading saved game
//-----------------------------------------------------------------------------
const alias_CGMZ_Crafting_onAfterLoad = CGMZ_Core.prototype.onAfterLoad;
CGMZ_Core.prototype.onAfterLoad = function() {
	alias_CGMZ_Crafting_onAfterLoad.call(this);
	this.initializeRecipeData();
};
//-----------------------------------------------------------------------------
// Returns array of all recipes
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.getAllRecipes = function() {
	return this._recipes;
};
//-----------------------------------------------------------------------------
// Returns array of all discovered recipes
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.getAllDiscoveredRecipes = function() {
	const discoveredRecipes = [];
	for(const recipe of this._recipes) {
		if(recipe._discovered) discoveredRecipes.push(recipe);
	}
	return discoveredRecipes;
};
//-----------------------------------------------------------------------------
// Returns array of all discovered recipes of certain type (profession)
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.getDiscoveredRecipesOfType = function(type) {
	const discoveredRecipes = [];
	for(const recipe of this._recipes) {
		if(recipe._discovered && recipe._profession === type) discoveredRecipes.push(recipe);
	}
	return discoveredRecipes;
};
//-----------------------------------------------------------------------------
// Get recipe by name. Returns null if unsuccessful
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.getRecipe = function(name) {
	for(const recipe of this._recipes) {
		if(name === recipe._name) return recipe;
	}
	return null;
};
//-----------------------------------------------------------------------------
// Alters the discovered property of a recipe
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.discoverRecipe = function(name, discovered) {
	const recipe = this.getRecipe(name);
	if(recipe) {
		(discovered) ? recipe.learn() : recipe.changeDiscoveredStatus(discovered);
	}
};
//-----------------------------------------------------------------------------
// Check if Item has a recipe learn property attached to it
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.checkItemForRecipe = function(item) {
	if(item?.meta?.cgmzrecipe) {
		this.discoverRecipe(item.meta.cgmzrecipe, true);
	}
};
//-----------------------------------------------------------------------------
// Returns array of all discovered recipes
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.checkCraftingRecipesForLearn = function() {
	for(const recipe of this._recipes) {
		if(recipe.canAutodiscover()) this.discoverRecipe(recipe._name, true);
	}
};
//=============================================================================
// CGMZ_Temp
//-----------------------------------------------------------------------------
// Adds plugin commands and initializes unsaved crafting data like generics
// and unsaved recipe data
//=============================================================================
//-----------------------------------------------------------------------------
// Set up generic item data and temp recipe data
//-----------------------------------------------------------------------------
const CGMZ_Crafting_CGMZTemp_createPluginData = CGMZ_Temp.prototype.createPluginData;
CGMZ_Temp.prototype.createPluginData = function() {
	CGMZ_Crafting_CGMZTemp_createPluginData.call(this);
	this.isCraftFilterKeyPressed = false;
	this._craftingGenericItems = {};
	this._recipes = {};
	this._craftingCategories = {};
	this.craftingSceneRequest = null;
	for(const itemJSON of CGMZ.Crafting.Generics) {
		const item = CGMZ_Utils.parseJSON(itemJSON, null, "[CGMZ] Crafting", "One of your generic items had invalid JSON and could not be read. Skipping.");
		if(!item) continue;
		const id = item.Type;
		this._craftingGenericItems[id] = new CGMZ_CraftingGenericItem(item);
	}
	for(const recipeJSON of CGMZ.Crafting.Recipes) {
		const recipeParse = CGMZ_Utils.parseJSON(recipeJSON, null, "[CGMZ] Crafting", "One of your recipes had invalid JSON and could not be read. Skipping.");
		if(!recipeParse) continue;
		const recipe = new CGMZ_RecipeTemp(recipeParse);
		this._recipes[recipe._name] = recipe;
	}
	for(const categoryJSON of CGMZ.Crafting.Categories) {
		const categoryParse = CGMZ_Utils.parseJSON(categoryJSON, null, "[CGMZ] Crafting", "One of your crafting categories had invalid JSON and could not be read. Skipping.");
		if(!categoryParse) continue;
		const category = new CGMZ_CraftingCategoryData(categoryParse);
		this._craftingCategories[category.id] = category;
	}
};
//-----------------------------------------------------------------------------
// Get crafting category
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.getCraftingCategoryData = function(id) {
	return this._craftingCategories[id];
};
//-----------------------------------------------------------------------------
// Get crafting generic item
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.getGenericCraftingItem = function(type) {
	return this._craftingGenericItems[type];
};
//-----------------------------------------------------------------------------
// Get recipe temp data
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.getRecipeTempData = function(name) {
	return this._recipes[name];
};
//-----------------------------------------------------------------------------
// Calculate the maximum amount of items that can be crafted
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.calculateMaxRecipeCraftTimes = function(name) {
	const recipeTemp = this.getRecipeTempData(name);
	const recipe = $cgmz.getRecipe(name);
	if(!recipeTemp || !recipe) return 0;
	const maxPossibleCrafts = 99;
	let max = maxPossibleCrafts;
	let tempMax = 0;
	for(const ingredient of recipeTemp.ingredients) {
		switch(ingredient.Type) {
			case 'currency':
				if(Imported.CGMZ_CurrencySystem && ingredient.ID) {
					tempMax = 9999;
					const currency = $cgmz.getCurrency(ingredient.ID);
					if(currency) {
						tempMax = Math.min(currency.amount() / ingredient.Amount, maxPossibleCrafts);
					}
				} else {
					tempMax = Math.min($gameParty.gold() / ingredient.Amount, maxPossibleCrafts);
				}
				if(tempMax < max) max = tempMax;
				break;
			case 'item':
			case 'weapon':
			case 'armor':
				const item = CGMZ_Utils.lookupItem(ingredient.Type, ingredient.ID);
				const numItems = $gameParty.numItems(item);
				tempMax = Math.min(numItems / ingredient.Amount, maxPossibleCrafts);
				if(tempMax < max) max = tempMax;
				break;
			case 'generic':
				const genItems = this.calculateTotalNumItemsOfGenericType(ingredient.GenericCategory);
				tempMax = Math.min(genItems / ingredient.Amount, maxPossibleCrafts);
				if(tempMax < max) max = tempMax;
				break;
		}
	}
	if(recipeTemp.productUniqueAmount > 0) {
		for(const product of recipeTemp.products) {
			if(product.Type === 'currency' || product.Type === 'generic') continue; // currency and generic cannot be unique
			const item = CGMZ_Utils.lookupItem(product.Type, product.ID);
			if(item) {
				const numItemsLeft = recipeTemp.productUniqueAmount - $gameParty.numItems(item);
				if(numItemsLeft < max) max = numItemsLeft;
			}
		}
	}
	if(max < 1) max = 0;
	return Math.floor(max);
};
//-----------------------------------------------------------------------------
// Calculate number of items/weapons/armors belonging to generic category
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.calculateTotalNumItemsOfGenericType = function(genericType) {
	let itemCount = 0;
	for(const item of $gameParty.allItems()) {
		if(item.meta && item.meta.cgmzcraftinggeneric && item.meta.cgmzcraftinggeneric.split(",").includes(genericType)) {
			itemCount += $gameParty.numItems(item);
		}
	}
	return itemCount;
};
//-----------------------------------------------------------------------------
// Update gamepad input
//-----------------------------------------------------------------------------
const alias_CGMZ_Crafting_updateLastGamepad = CGMZ_Temp.prototype.updateLastGamepad;
CGMZ_Temp.prototype.updateLastGamepad = function(gamepad) {
	alias_CGMZ_Crafting_updateLastGamepad.call(this, gamepad);
	if(gamepad?.buttons[CGMZ.Crafting.FilterGamepad].pressed) {
		this.isCraftFilterKeyPressed = true;
	}
};
//-----------------------------------------------------------------------------
// Create mapped functions
//-----------------------------------------------------------------------------
const alias_CGMZCrafting_createMappedFunctions = CGMZ_Temp.prototype.createMappedFunctions;
CGMZ_Temp.prototype.createMappedFunctions = function() {
	alias_CGMZCrafting_createMappedFunctions.call(this);
	this._mappedFunctions["onCraftTimerFinish"] = this.onCraftTimerFinish.bind(this);
};
//-----------------------------------------------------------------------------
// Processing when a craft timer finishes
// args is in the format:
// recipe: (string) recipe's name
// success: (boolean) craft was a success?
// prof: (object: {lv: profLevel, id: profId}) contains prof id (string) and prof level at time of craft start (number). Will be null if not using professions or not needed to pop scene
// hq: (boolean) if craft was high quality or not
// amount: (number) amount to craft if multicraft
// timeNeeded: (number) frame count of the craft
// currentTime: (number) frame count at the time the craft started
// timerKey: (string) the timer key
// fullRecipeCraftTime: (number) the full amount of time the craft takes to create whether if successful
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.onCraftTimerFinish = function(args) {
	const recipe = $cgmz.getRecipe(args.recipe);
	const recipeTemp = $cgmzTemp.getRecipeTempData(args.recipe);
	if(!recipe) return;
	const isInCraftScene = SceneManager._scene.constructor.name === 'CGMZ_Scene_Crafting';
	if(isInCraftScene) {
		let pop = false;
		if(args.prof) {
			const profession = $cgmz.getProfession(prof.id);
			if(profession && prof.lv < profession._level) pop = true;
		}
		$cgmzTemp.createCraftSceneRequest(args.recipe, args.success, args.hq, pop, args.amount - 1, args.timerKey);
	}
	recipe.finishCraft(args.success, args.hq);
	const newAmount = args.amount - 1;
	if(newAmount > 0 && recipe._discovered && recipe.canCraft()) {
		recipe.startCraft();
		const ext = $cgmzTemp.makeCraftTimerInfo(args.recipe, args.timerKey, newAmount);
		const timer = new CGMZ_Timer(
			ext.timeNeeded,
			ext.timerKey,
			"onCraftTimerFinish",
			ext
		);
		$cgmz.requestNewTimer(timer);
	} else {
		recipe.setupCompleteToast();
	}
};
//-----------------------------------------------------------------------------
// Make the craft timer info
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.makeCraftTimerInfo = function(recipeId, timerKey, amount) {
	const recipe = $cgmz.getRecipe(recipeId);
	const recipeTemp = $cgmzTemp.getRecipeTempData(recipeId);
	let success, timeNeeded, profLevel, profId, hq;
	if(recipe.calculateSuccessRate()/100.0 > Math.random()) {
		success = true;
		timeNeeded = recipeTemp.time;
	} else {
		success = false;
		timeNeeded = Math.max(Math.random()*recipeTemp.time, recipeTemp.time/2);
	}
	if(Imported.CGMZ_Professions && CGMZ.Crafting.PopSceneOnLevel) {
		const profession = $cgmz.getProfession(recipe._profession);
		if(profession) {
			profLevel = profession._level;
			profId = profession.getId();
		}
	}
	hq = (success) ? (recipe.calculateHighQualityRate()/100.0 > Math.random()) : false;
	return {
		recipe: recipeId,
		success: success,
		prof: (profId) ? {lv: profLevel, id: profId} : null,
		hq: hq,
		amount: amount,
		timeNeeded: timeNeeded,
		currentTime: Graphics.frameCount,
		timerKey: timerKey,
		fullRecipeCraftTime: recipeTemp.time
	};
};
//-----------------------------------------------------------------------------
// Create a request for the craft scene
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.createCraftSceneRequest = function(recipeId, success, hq, pop, newAmount, key) {
	this.craftingSceneRequest = {
		recipe: recipeId,
		success: success,
		hq: hq,
		pop: pop,
		amount: newAmount,
		key: key
	}
};
//-----------------------------------------------------------------------------
// Create a timer key for a recipe
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.createCraftingTimerKey = function(recipeName, sceneKey = "") {
	if(sceneKey) return `crafting-${recipeName}-${sceneKey}`;
	return `crafting-${recipeName}`;
};
//-----------------------------------------------------------------------------
// Register Plugin Commands
//-----------------------------------------------------------------------------
const alias_CGMZ_Crafting_registerPluginCommands = CGMZ_Temp.prototype.registerPluginCommands;
CGMZ_Temp.prototype.registerPluginCommands = function() {
	alias_CGMZ_Crafting_registerPluginCommands.call(this);
	PluginManager.registerCommand("CGMZ_Crafting", "discover", this.pluginCommandCraftingDiscover);
	PluginManager.registerCommand("CGMZ_Crafting", "Call Scene", this.pluginCommandCraftingCallScene);
	PluginManager.registerCommand("CGMZ_Crafting", "Set Description", this.pluginCommandCraftingSetDescription);
	PluginManager.registerCommand("CGMZ_Crafting", "Is Scene Crafting", this.pluginCommandCraftingIsSceneCrafting);
	PluginManager.registerCommand("CGMZ_Crafting", "Reinitialize", this.pluginCommandCraftingReinitialize);
};
//-----------------------------------------------------------------------------
// Plugin Command - Reinitialize
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandCraftingReinitialize = function() {
	$cgmz.initializeRecipeData(true);
};
//-----------------------------------------------------------------------------
// Plugin Command - Discover
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandCraftingDiscover = function(args) {
	$cgmz.discoverRecipe(args.name, (args.discover === 'true'));
};
//-----------------------------------------------------------------------------
// Plugin Command - Call Scene
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandCraftingCallScene = function(args) {
	SceneManager.push(CGMZ_Scene_Crafting);
	const types = CGMZ_Utils.parseJSON(args.type, [], "[CGMZ] Crafting", "Your Call Scene Plugin Command had invalid JSON for the 'type' argument.");
	const viewOnly = (args["View Only"] === 'true');
	SceneManager.prepareNextScene(types, viewOnly, args["Background Preset"], args["Scene Key"]);
};
//-----------------------------------------------------------------------------
// Plugin Command - Set Description
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandCraftingSetDescription = function(args) {
	const recipe = $cgmz.getRecipe(args.name);
	if(!recipe) return;
	const newDescription = CGMZ_Utils.parseJSON(args.description, null, "[CGMZ] Crafting", "Your Set Description plugin command had invalid JSON for the description argument. Could not set description.");
	if(!newDescription) return;
	recipe.setDescription(newDescription);
};
//-----------------------------------------------------------------------------
// Plugin Command - Is Scene Crafting
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandCraftingIsSceneCrafting = function(args) {
	const key = args["Scene Key"];
	const s = Number(args["Game Switch"]);
	if(key && s) {
		const timers = $cgmz.getAllTimers();
		const isCrafting = timers.some(timer => timer._id.includes(key));
		$gameSwitches.setValue(s, isCrafting);
	}
};
//=============================================================================
// CGMZ_Scene_Crafting
//-----------------------------------------------------------------------------
// Handle the crafting scene
//=============================================================================
function CGMZ_Scene_Crafting(craftType) {
	this.initialize.apply(this, arguments);
}
CGMZ_Scene_Crafting.prototype = Object.create(Scene_MenuBase.prototype);
CGMZ_Scene_Crafting.prototype.constructor = CGMZ_Scene_Crafting;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Scene_Crafting.prototype.initialize = function(craftType = null) {
	this._craftType = (craftType) ? craftType : [];
	this._viewOnly = false;
	this._bgPresetId = "";
	this._sceneKey = "";
	$cgmzTemp.isCraftFilterKeyPressed = false;
	this.clearFilters();
	Scene_MenuBase.prototype.initialize.call(this);
};
//-----------------------------------------------------------------------------
// Prepare
//-----------------------------------------------------------------------------
CGMZ_Scene_Crafting.prototype.prepare = function(craftType = null, viewOnly = false, bgPresetId = "", sceneKey = "") {
	this._craftType = (craftType) ? craftType : [];
	this._viewOnly = viewOnly;
	this._bgPresetId = bgPresetId;
	this._sceneKey = sceneKey;
};
//-----------------------------------------------------------------------------
// Create crafting windows
//-----------------------------------------------------------------------------
CGMZ_Scene_Crafting.prototype.create = function() {
	Scene_MenuBase.prototype.create.call(this);
	this.createCategoryWindow();
	this.createListWindow();
	this.createDisplayWindow();
	this.createProgressWindow();
	this.createConfirmationWindow();
	this.createMulticraftWindow();
	this.createFilterTypeWindow();
	this.createFilterOptionWindow();
	this.afterWindowCreate();
};
//-----------------------------------------------------------------------------
// Update scene - check for pop on level up, also check for recipe disagreement
// between list and display window, and update windows as needed
//-----------------------------------------------------------------------------
CGMZ_Scene_Crafting.prototype.update = function() {
	Scene_MenuBase.prototype.update.call(this);
	const request = $cgmzTemp.craftingSceneRequest;
	if(this._listWindow && this._displayWindow) {
		const litem = this._listWindow.item();
		const ditem = this._displayWindow._recipe;
		if(litem && ditem && litem._name !== ditem._name) {
			this._listWindow.callUpdateHelp();
		}
		if(request && litem) {
			this._listWindow.requestRefresh();
			const keySplit = request.key.split('-');
			const key = (keySplit.length === 3) ? keySplit[2] : "";
			if(litem._name === request.recipe && key === this._sceneKey) {
				this.handleRequestForCurrentlySelectedRecipe();
			}
		}
	}
	if(request?.pop) this.popScene();
	$cgmzTemp.craftingSceneRequest = null;
	if(this._listWindow?.active) {
		this.updateFilterInput();
	}
};
//-----------------------------------------------------------------------------
// Handle a request for the currently selected recipe
//-----------------------------------------------------------------------------
CGMZ_Scene_Crafting.prototype.handleRequestForCurrentlySelectedRecipe = function() {
	const request = $cgmzTemp.craftingSceneRequest;
	this._displayWindow.requestRefresh();
	const recipeTemp = $cgmzTemp.getRecipeTempData(request.recipe);
	if(request.amount) {
		this._progressWindow.resetForNextCraft();
	} else {
		this._progressWindow.startDisplayCraftResult(request.success, request.hq);
	}
	if(recipeTemp) {
		const se = (request.success) ? recipeTemp.successSE : recipeTemp.failSE;
		AudioManager.playSe(se);
	}
	if(Imported.CGMZ_Rumble) {
		request.success ? $cgmzTemp.startRumble(CGMZ.Crafting.SuccessRumble) : $cgmzTemp.startRumble(CGMZ.Crafting.FailRumble)
	}
	if(CGMZ.Crafting.WaitForFinish) {
		const timer = $cgmz.getTimerById(request.key);
		if(!timer) this.activateListWindow();
	}
};
//-----------------------------------------------------------------------------
// Update to check for filter input. Called when the list window is active.
//-----------------------------------------------------------------------------
CGMZ_Scene_Crafting.prototype.updateFilterInput = function() {
	if(!CGMZ.Crafting.AllowFilter) return;
	if($cgmzTemp.isKeyPressed(CGMZ.Crafting.FilterKey)) {
		this.startFilterFlow();
	} else if($cgmzTemp.isCraftFilterKeyPressed) {
		this.startFilterFlow();
	}
};
//-----------------------------------------------------------------------------
// Create category window
//-----------------------------------------------------------------------------
CGMZ_Scene_Crafting.prototype.createCategoryWindow = function() {
	if(!CGMZ.Crafting.ShowCategoryWindow) return;
	const rect = this.categoryWindowRect();
	this._categoryWindow = new CGMZ_Window_RecipeCategory(rect, this._craftType);
	this._categoryWindow.setHandler('cancel', this.popScene.bind(this));
	this._categoryWindow.setHandler('ok', this.onCategoryOk.bind(this));
	this.addWindow(this._categoryWindow);
};
//-----------------------------------------------------------------------------
// Get the category window rect
//-----------------------------------------------------------------------------
CGMZ_Scene_Crafting.prototype.categoryWindowRect = function() {
	const x = 0;
	const y = this.hasTouchUI() ? this.buttonAreaHeight() : 0;
	const width = Graphics.boxWidth;
	const height = this.calcWindowHeight(1, true);
	return new Rectangle(x, y, width, height);
};
//-----------------------------------------------------------------------------
// Create list window
//-----------------------------------------------------------------------------
CGMZ_Scene_Crafting.prototype.createListWindow = function() {
	const rect = this.listWindowRect();
	this._listWindow = new CGMZ_Window_RecipeList(rect, this._craftType);
	this._listWindow.setHandler('cancel', this.onListCancel.bind(this));
	this._listWindow.setHandler('ok', this.onListOk.bind(this));
	this.addWindow(this._listWindow);
};
//-----------------------------------------------------------------------------
// Get the list window rect
//-----------------------------------------------------------------------------
CGMZ_Scene_Crafting.prototype.listWindowRect = function() {
	const y = this._categoryWindow ? this._categoryWindow.y + this._categoryWindow.height : this.hasTouchUI() ? this.buttonAreaHeight() : 0;
	const height = Graphics.boxHeight - y;
	const width = Graphics.boxWidth * (CGMZ.Crafting.ListWindowWidth / 100.0);
	const x = CGMZ.Crafting.ListWindowRight ? Graphics.boxWidth - width : 0;
	return new Rectangle(x, y, width, height);
};
//-----------------------------------------------------------------------------
// Create display window
//-----------------------------------------------------------------------------
CGMZ_Scene_Crafting.prototype.createDisplayWindow = function() {
	const rect = this.displayWindowRect();
	this._displayWindow = new CGMZ_Window_RecipeDisplay(rect);
	this.addWindow(this._displayWindow);
};
//-----------------------------------------------------------------------------
// Get the display window rect
//-----------------------------------------------------------------------------
CGMZ_Scene_Crafting.prototype.displayWindowRect = function() {
	const x = CGMZ.Crafting.ListWindowRight ? 0 : this._listWindow.width;
	const y = this._listWindow.y;
	const height = this._listWindow.height - this.calcWindowHeight(1, false) * !CGMZ.Crafting.InstantCrafting;
	const width = Graphics.boxWidth - this._listWindow.width;
	return new Rectangle(x, y, width, height);
};
//-----------------------------------------------------------------------------
// Create progress window
//-----------------------------------------------------------------------------
CGMZ_Scene_Crafting.prototype.createProgressWindow = function() {
	const rect = this.progressWindowRect();
	this._progressWindow = new CGMZ_Window_RecipeProgress(rect, this._sceneKey);
	this.addWindow(this._progressWindow);
};
//-----------------------------------------------------------------------------
// Get rectangle for progress window
//-----------------------------------------------------------------------------
CGMZ_Scene_Crafting.prototype.progressWindowRect = function() {
	const x = this._displayWindow.x;
	const y = this._displayWindow.y + this._displayWindow.height;
	const height = this.calcWindowHeight(1, false);
	const width = this._displayWindow.width;
	const rect = (CGMZ.Crafting.InstantCrafting) ? new Rectangle(0, 0, 0, 0) : new Rectangle(x, y, width, height);
	return rect;
};
//-----------------------------------------------------------------------------
// Create confirmation window
//-----------------------------------------------------------------------------
CGMZ_Scene_Crafting.prototype.createConfirmationWindow = function() {
	const rect = this.confirmationWindowRect();
	this._confirmationWindow = new CGMZ_Window_CraftConfirmation(rect);
	this._confirmationWindow.setHandler('craft', this.onCraftConfirm.bind(this));
	this._confirmationWindow.setHandler('cancel', this.onCraftCancel.bind(this));
	this.addWindow(this._confirmationWindow);
};
//-----------------------------------------------------------------------------
// Get rectangle for confirmation window
//-----------------------------------------------------------------------------
CGMZ_Scene_Crafting.prototype.confirmationWindowRect = function() {
	const height = this.calcWindowHeight(2, true);
	const width = Graphics.boxWidth / 4;
	const x = Graphics.boxWidth / 2 - width / 2;
	const y = Graphics.boxHeight / 2 - height / 2;
	return new Rectangle(x, y, width, height);
};
//-----------------------------------------------------------------------------
// Create multicraft window
//-----------------------------------------------------------------------------
CGMZ_Scene_Crafting.prototype.createMulticraftWindow = function() {
	const rect = this.multicraftWindowRect();
	this._multicraftWindow = new CGMZ_Window_Multicraft(rect);
	this._multicraftWindow.setHandler('ok', this.onMulticraftConfirm.bind(this));
	this._multicraftWindow.setHandler('cancel', this.onMulticraftCancel.bind(this));
	this.addWindow(this._multicraftWindow);
};
//-----------------------------------------------------------------------------
// Get rectangle for multicraft window
//-----------------------------------------------------------------------------
CGMZ_Scene_Crafting.prototype.multicraftWindowRect = function() {
	const height = this.calcWindowHeight(1 + 1 * ConfigManager.touchUI, true);
	const width = Graphics.boxWidth * (CGMZ.Crafting.MulticraftWindowWidth / 100.0);
	const x = Graphics.boxWidth / 2 - width / 2;
	const y = Graphics.boxHeight / 2 - height / 2;
	return new Rectangle(x, y, width, height);
};
//-----------------------------------------------------------------------------
// Create filter type window
//-----------------------------------------------------------------------------
CGMZ_Scene_Crafting.prototype.createFilterTypeWindow = function() {
	const rect = this.filterTypeWindowRect();
	this._filterTypeWindow = new CGMZ_Window_FilterType(rect);
	this._filterTypeWindow.setHandler('ok', this.onFilterTypeConfirm.bind(this));
	this._filterTypeWindow.setHandler('cancel', this.onFilterTypeCancel.bind(this));
	this.addWindow(this._filterTypeWindow);
};
//-----------------------------------------------------------------------------
// Get initial rectangle for filter type window
//-----------------------------------------------------------------------------
CGMZ_Scene_Crafting.prototype.filterTypeWindowRect = function() {
	const height = this.calcWindowHeight(this.getFilterTypeOptionCount(), true);
	const width = Graphics.boxWidth * (0.5);
	const x = Graphics.boxWidth / 2 - width / 2;
	const y = Graphics.boxHeight / 2 - height / 2;
	return new Rectangle(x, y, width, height);
};
//-----------------------------------------------------------------------------
// Get count of filter types
//-----------------------------------------------------------------------------
CGMZ_Scene_Crafting.prototype.getFilterTypeOptionCount = function() {
	let count = 1; // There is always the Remove Filter option
	if(this._categoryFilters.length > 0) count++;
	if(this._subcategoryFilters.length > 0) count++;
	if(this._qualityFilters.length > 0) count++;
	return count;
};
//-----------------------------------------------------------------------------
// Create filter option window
//-----------------------------------------------------------------------------
CGMZ_Scene_Crafting.prototype.createFilterOptionWindow = function() {
	const rect = this.filterOptionWindowRect();
	this._filterOptionWindow = new CGMZ_Window_FilterOption(rect);
	this._filterOptionWindow.setHandler('ok', this.onFilterOptionConfirm.bind(this));
	this._filterOptionWindow.setHandler('cancel', this.onFilterOptionCancel.bind(this));
	this.addWindow(this._filterOptionWindow);
};
//-----------------------------------------------------------------------------
// Get initial rectangle for filter option window
//-----------------------------------------------------------------------------
CGMZ_Scene_Crafting.prototype.filterOptionWindowRect = function() {
	const height = this.calcWindowHeight(this.getFilterOptionOptionCount(), true);
	const width = Graphics.boxWidth * (0.5);
	const x = Graphics.boxWidth / 2 - width / 2;
	const y = Graphics.boxHeight / 2 - height / 2;
	return new Rectangle(x, y, width, height);
};
//-----------------------------------------------------------------------------
// Get count of filter types
//-----------------------------------------------------------------------------
CGMZ_Scene_Crafting.prototype.getFilterOptionOptionCount = function() {
	const type = this._filterTypeWindow.item();
	switch(type) {
		case 'quality': return this._qualityFilters.length;
		case 'category': return this._categoryFilters.length;
		case 'subcategory': return this._subcategoryFilters.length;
	}
	return 0;
};
//-----------------------------------------------------------------------------
// Processing after windows have been created
//-----------------------------------------------------------------------------
CGMZ_Scene_Crafting.prototype.afterWindowCreate = function() {
	this._listWindow.setDisplayWindow(this._displayWindow);
	this._listWindow.setProgressWindow(this._progressWindow);
	if(this._categoryWindow) {
		this._categoryWindow.setListWindow(this._listWindow);
		this._categoryWindow.activate();
	} else {
		this._listWindow.activate();
	}
	this.setFilters();
	if(this._listWindow.active && this.hasFilter()) this._filterButton?.show();
};
//-----------------------------------------------------------------------------
// Check if should make room for Touch UI
//-----------------------------------------------------------------------------
CGMZ_Scene_Crafting.prototype.hasTouchUI = function() {
	return !CGMZ.Crafting.DisableTouchUISpace || ConfigManager.touchUI;
};
//-----------------------------------------------------------------------------
// On Category Ok
//-----------------------------------------------------------------------------
CGMZ_Scene_Crafting.prototype.onCategoryOk = function() {
	this.activateListWindow();
	this.setFilters();
	this._listWindow.select(0);
	this._categoryWindow.deactivate();
};
//-----------------------------------------------------------------------------
// On List Cancel
//-----------------------------------------------------------------------------
CGMZ_Scene_Crafting.prototype.onListCancel = function() {
	if(this._categoryWindow) {
		this._listWindow.setFilterMode(null, null);
		this._listWindow.select(0);
		this._listWindow.ensureCursorVisible();
		this._listWindow.deselect();
		this._categoryWindow.activate();
		this._listWindow.deactivate();
		this._displayWindow.setItem(0);
		this._displayWindow.contents.clear();
		this._filterButton?.hide();
		this._progressWindow.setItem(null);
	} else {
		this.popScene();
	}
};
//-----------------------------------------------------------------------------
// On List Ok
//-----------------------------------------------------------------------------
CGMZ_Scene_Crafting.prototype.onListOk = function() {
	if(!this._viewOnly) {
		if(this._displayWindow.canCraft() && this._progressWindow.canCraft()) {
			this._listWindow.deactivate();
			this._filterButton?.hide();
			if(CGMZ.Crafting.ShowConfirmationWindow) {
				this._confirmationWindow.activate();
				this._confirmationWindow.show();
			} else {
				if(CGMZ.Crafting.AllowMulticraft) {
					this.startMulticraft();
				} else {
					this.startCraft();
				}
			}
		} else {
			this._listWindow.activate();
		}
	} else {
		this._listWindow.activate();
	}
};
//-----------------------------------------------------------------------------
// On Craft Confirmation
//-----------------------------------------------------------------------------
CGMZ_Scene_Crafting.prototype.onCraftConfirm = function() {
	this._confirmationWindow.deactivate();
	this._confirmationWindow.hide();
	if(CGMZ.Crafting.AllowMulticraft) {
		this.startMulticraft();
	} else {
		this.startCraft();
	}
};
//-----------------------------------------------------------------------------
// On Craft Confirmation Cancel
//-----------------------------------------------------------------------------
CGMZ_Scene_Crafting.prototype.onCraftCancel = function() {
	this.activateListWindow();
	this._confirmationWindow.deactivate();
	this._confirmationWindow.hide();
};
//-----------------------------------------------------------------------------
// On Multicraft Confirmation
//-----------------------------------------------------------------------------
CGMZ_Scene_Crafting.prototype.onMulticraftConfirm = function() {
	this._multicraftWindow.deactivate();
	this._multicraftWindow.hide();
	this.startCraft();
};
//-----------------------------------------------------------------------------
// On Multicraft Cancel
//-----------------------------------------------------------------------------
CGMZ_Scene_Crafting.prototype.onMulticraftCancel = function() {
	this.activateListWindow();
	this._multicraftWindow.deactivate();
	this._multicraftWindow.hide();
};
//-----------------------------------------------------------------------------
// Start Multicraft Select
//-----------------------------------------------------------------------------
CGMZ_Scene_Crafting.prototype.startMulticraft = function() {
	const maxCrafts = $cgmzTemp.calculateMaxRecipeCraftTimes(this._displayWindow._recipe?._name);
	this._multicraftWindow.setup(maxCrafts);
	this._multicraftWindow.activate();
	this._multicraftWindow.show();
};
//-----------------------------------------------------------------------------
// Start Crafting
//-----------------------------------------------------------------------------
CGMZ_Scene_Crafting.prototype.startCraft = function() {
	if(CGMZ.Crafting.InstantCrafting) {
		this._progressWindow.doInstantCraft(this._multicraftWindow.number());
		this._listWindow.refresh();
		this._displayWindow.refresh();
		this.activateListWindow();
	} else {
		this._progressWindow.startCraft(this._multicraftWindow.number());
		this._displayWindow.refresh();
	}
	if(!CGMZ.Crafting.WaitForFinish) this.activateListWindow();
};
//-----------------------------------------------------------------------------
// Processing when activating the list window
//-----------------------------------------------------------------------------
CGMZ_Scene_Crafting.prototype.activateListWindow = function() {
	$cgmzTemp.isCraftFilterKeyPressed = false;
	this._listWindow.activate();
	if(this.hasFilter()) this._filterButton?.show();
};
//-----------------------------------------------------------------------------
// Check if should provide filter option
//-----------------------------------------------------------------------------
CGMZ_Scene_Crafting.prototype.hasFilter = function() {
	return this._hasFilters;
};
//-----------------------------------------------------------------------------
// Set up filter info
//-----------------------------------------------------------------------------
CGMZ_Scene_Crafting.prototype.setFilters = function() {
	if(!CGMZ.Crafting.AllowFilter) return;
	if(!this._listWindow) return;
	const category = this._listWindow._category;
	this.clearFilters();
	this._categoryFilters = this.getCategoryFilters();
	this._qualityFilters = this.getQualityFilters(category);
	this._subcategoryFilters = this.getSubcategoryFilters(category);
	this._hasFilters = (this._categoryFilters.length > 0 || this._qualityFilters.length > 0 || this._subcategoryFilters.length > 0);
};
//-----------------------------------------------------------------------------
// Get possible category filters
//-----------------------------------------------------------------------------
CGMZ_Scene_Crafting.prototype.getCategoryFilters = function() {
	if(this._categoryWindow) return [];
	return CGMZ.Crafting.CategoryFilterOptions;
};
//-----------------------------------------------------------------------------
// Get possible subcategory filters
//-----------------------------------------------------------------------------
CGMZ_Scene_Crafting.prototype.getSubcategoryFilters = function(category) {
	const possibleFilters = CGMZ.Crafting.SubcategoryFilterOptions.map((opt) => {
		const split = opt.split(":");
		return (split[0] === category || split[0].toLowerCase() === 'all') ? split[1] : null;
	});
	return possibleFilters.filter(x => !!x);
};
//-----------------------------------------------------------------------------
// Get possible quality filters
//-----------------------------------------------------------------------------
CGMZ_Scene_Crafting.prototype.getQualityFilters = function(category) {
	const possibleFilters = CGMZ.Crafting.QualityFilterOptions.map((opt) => {
		const split = opt.split(":");
		return (split[0] === category || split[0].toLowerCase() === 'all') ? split[1] : null;
	});
	return possibleFilters.filter(x => !!x);
};
//-----------------------------------------------------------------------------
// Clear Filters
//-----------------------------------------------------------------------------
CGMZ_Scene_Crafting.prototype.clearFilters = function() {
	this._categoryFilters = [];
	this._qualityFilters = [];
	this._subcategoryFilters = [];
	this._hasFilters = false;
};
//-----------------------------------------------------------------------------
// Get Filters
//-----------------------------------------------------------------------------
CGMZ_Scene_Crafting.prototype.getFilters = function() {
	return {
		category: this._categoryFilters,
		quality: this._qualityFilters,
		subcategory: this._subcategoryFilters
	};
};
//-----------------------------------------------------------------------------
// Start the filter flow, if possible
//-----------------------------------------------------------------------------
CGMZ_Scene_Crafting.prototype.startFilterFlow = function() {
	if(!this.canFilter()) return;
	this._listWindow.deactivate();
	const rect = this.filterTypeWindowRect();
	this._filterTypeWindow.move(rect.x, rect.y, rect.width, rect.height);
	this._filterTypeWindow.createContents();
	this._filterTypeWindow.refresh(this.getFilters());
	this._filterTypeWindow.activate();
	this._filterTypeWindow.show();
};
//-----------------------------------------------------------------------------
// Check if filtering is currently possible
//-----------------------------------------------------------------------------
CGMZ_Scene_Crafting.prototype.canFilter = function() {
	return this._listWindow.active;
};
//-----------------------------------------------------------------------------
// On Filter Type Cancel
//-----------------------------------------------------------------------------
CGMZ_Scene_Crafting.prototype.onFilterTypeCancel = function() {
	this._filterTypeWindow.deactivate();
	this._filterTypeWindow.hide();
	this.activateListWindow();
};
//-----------------------------------------------------------------------------
// On Filter Type Confirm
//-----------------------------------------------------------------------------
CGMZ_Scene_Crafting.prototype.onFilterTypeConfirm = function() {
	const type = this._filterTypeWindow.item();
	if(type === 'remove') {
		this._filterTypeWindow.deactivate();
		this._filterTypeWindow.hide();
		this._listWindow.setFilterMode(null, null);
		this.activateListWindow();
	} else {
		const rect = this.filterOptionWindowRect();
		this._filterOptionWindow.move(rect.x, rect.y, rect.width, rect.height);
		this._filterOptionWindow.createContents();
		this._filterOptionWindow.setFilterType(type);
		this._filterOptionWindow.refresh(this.getFilters());
		this._filterTypeWindow.deactivate();
		this._filterTypeWindow.hide();
		this._filterOptionWindow.activate();
		this._filterOptionWindow.show();
	}
};
//-----------------------------------------------------------------------------
// On Filter Option Cancel
//-----------------------------------------------------------------------------
CGMZ_Scene_Crafting.prototype.onFilterOptionCancel = function() {
	this._filterOptionWindow.deactivate();
	this._filterOptionWindow.hide();
	this._filterTypeWindow.activate();
	this._filterTypeWindow.show();
};
//-----------------------------------------------------------------------------
// On Filter Option Confirm
//-----------------------------------------------------------------------------
CGMZ_Scene_Crafting.prototype.onFilterOptionConfirm = function() {
	const type = this._filterTypeWindow.item();
	const value = this._filterOptionWindow.item();
	this._filterOptionWindow.deactivate();
	this._filterOptionWindow.hide();
	this._listWindow.setFilterMode(type, value);
	this.activateListWindow();
};
//-----------------------------------------------------------------------------
// Create filter button if needed
//-----------------------------------------------------------------------------
CGMZ_Scene_Crafting.prototype.createButtons = function() {
	Scene_MenuBase.prototype.createButtons.call(this);
	this.createFilterButton();
};
//-----------------------------------------------------------------------------
// Create filter Button
//-----------------------------------------------------------------------------
CGMZ_Scene_Crafting.prototype.createFilterButton = function() {
	this._filterButton = new Sprite_Button("cgmzFilter");
	this._filterButton.x = Graphics.boxWidth - this._filterButton.width - 4 - this._cancelButton?.width - 4;
	this._filterButton.y = this.buttonY();
	this._filterButton.setClickHandler(this.startFilterFlow.bind(this));
	this._filterButton.hide();
	this.addWindow(this._filterButton);
};
//-----------------------------------------------------------------------------
// Get the scene's custom scene background
// No need to check if Scene Backgrounds is installed because this custom func
// is only called by that plugin
//-----------------------------------------------------------------------------
CGMZ_Scene_Crafting.prototype.CGMZ_getCustomSceneBackground = function() {
	const presetId = this._bgPresetId || CGMZ.Crafting.SceneBackground;
	return $cgmzTemp.sceneBackgroundPresets[presetId];
};
//=============================================================================
// Sprite_Button
//-----------------------------------------------------------------------------
// Add filter button
//=============================================================================
//-----------------------------------------------------------------------------
// Alias. If undefined, check if filter button and return expected results
//-----------------------------------------------------------------------------
const alias_CGMZ_Crafting_SpriteButton_buttonData = Sprite_Button.prototype.buttonData;
Sprite_Button.prototype.buttonData = function() {
	data = alias_CGMZ_Crafting_SpriteButton_buttonData.call(this);
	if(data) return data;
	const CGMZCraftingButtonTable = {
		cgmzFilter: {x: CGMZ.Crafting.FilterButtonOffset, w: CGMZ.Crafting.FilterButtonWidth}
	};
	return CGMZCraftingButtonTable[this._buttonType];
};
//=============================================================================
// CGMZ_Window_RecipeCategory
//-----------------------------------------------------------------------------
// Selectable window for choosing a recipe type
//=============================================================================
function CGMZ_Window_RecipeCategory(rect) {
	this.initialize.apply(this, arguments);
}
CGMZ_Window_RecipeCategory.prototype = Object.create(Window_Selectable.prototype);
CGMZ_Window_RecipeCategory.prototype.constructor = CGMZ_Window_RecipeCategory;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Window_RecipeCategory.prototype.initialize = function(rect, craftType) {
	Window_Selectable.prototype.initialize.call(this, rect);
	this._craftType = craftType;
	this._data = [];
	this.refresh();
	this.select(0);
	this.setBackgroundType(2 * (CGMZ.Crafting.WindowTransparency));
};
//-----------------------------------------------------------------------------
// Add CGMZ Window Options
//-----------------------------------------------------------------------------
CGMZ_Window_RecipeCategory.prototype.CGMZ_createWindowOptions = function() {
	Window_Selectable.prototype.CGMZ_createWindowOptions.call(this);
	if(CGMZ.Crafting.CategoryWindowskin) this.cgmzOpts.windowskin = CGMZ.Crafting.CategoryWindowskin;
	if(CGMZ.Crafting.CategoryPadding >= 0) this.cgmzOpts.padding = CGMZ.Crafting.CategoryPadding;
	if(CGMZ.Crafting.CategoryBackOpacity >= 0) this.cgmzOpts.backOpacity = CGMZ.Crafting.CategoryBackOpacity;
	if(CGMZ.Crafting.CategoryTone?.Red >= -255) this.cgmzOpts.tone = [CGMZ.Crafting.CategoryTone.Red, CGMZ.Crafting.CategoryTone.Green, CGMZ.Crafting.CategoryTone.Blue];
};
//-----------------------------------------------------------------------------
// Max items
//-----------------------------------------------------------------------------
CGMZ_Window_RecipeCategory.prototype.maxItems = function() {
	return this._data ? this._data.length : 1;
};
//-----------------------------------------------------------------------------
// Max columns
//-----------------------------------------------------------------------------
CGMZ_Window_RecipeCategory.prototype.maxCols = function() {
	return 4;
};
//-----------------------------------------------------------------------------
// Current item
//-----------------------------------------------------------------------------
CGMZ_Window_RecipeCategory.prototype.item = function() {
	return this._data[this.index()];
};
//-----------------------------------------------------------------------------
// Refresh
//-----------------------------------------------------------------------------
CGMZ_Window_RecipeCategory.prototype.refresh = function() {
	this.makeItemList();
	this.createContents();
	this.drawAllItems();
};
//-----------------------------------------------------------------------------
// Make item list
//-----------------------------------------------------------------------------
CGMZ_Window_RecipeCategory.prototype.makeItemList = function() {
	this._data = [];
	if(this._craftType.length === 0) {
		const recipes = $cgmz.getAllDiscoveredRecipes().filter(this.includeRecipeInList);
		for(const recipe of recipes) {
			const recipeCategory = recipe._profession;
			if(!this._data.includes(recipeCategory)) this._data.push(recipeCategory);
		}
		this._data.sort((a, b) => {
			const ia = CGMZ.Crafting.CategorySortOrder.indexOf(a);
			const ib = CGMZ.Crafting.CategorySortOrder.indexOf(b);
			return ib - ia;
		});
	}
	else {
		this._data = this._craftType;
	}
};
//-----------------------------------------------------------------------------
// Determine if recipe should be included in list
//-----------------------------------------------------------------------------
CGMZ_Window_RecipeCategory.prototype.includeRecipeInList = function(recipe) {
	if(CGMZ.Crafting.HideUncraftableRecipes && !recipe.canCraft()) return false;
	if(CGMZ.Crafting.HideHighLevelRecipes && !recipe.meetsLevelRequirements()) return false;
	return true;
};
//-----------------------------------------------------------------------------
// Draw item in list
//-----------------------------------------------------------------------------
CGMZ_Window_RecipeCategory.prototype.drawItem = function(index) {
	const item = this._data[index];
	const category = $cgmzTemp.getCraftingCategoryData(item) || {commandText: item};
	const rect = this.itemRectWithPadding(index);
	this.CGMZ_drawTextLine(category.commandText, rect.x, rect.y, rect.width, 'center');
};
//-----------------------------------------------------------------------------
// Set list window
//-----------------------------------------------------------------------------
CGMZ_Window_RecipeCategory.prototype.setListWindow = function(listWindow) {
	this._listWindow = listWindow;
	this.callUpdateHelp();
};
//-----------------------------------------------------------------------------
// See if can update list window
//-----------------------------------------------------------------------------
CGMZ_Window_RecipeCategory.prototype.callUpdateHelp = function() {
	if(this.active && this._listWindow) {
		this._listWindow.setItem(this.item());
	}
};
//-----------------------------------------------------------------------------
// If refresh is requested from other window
//-----------------------------------------------------------------------------
CGMZ_Window_RecipeCategory.prototype.requestRefresh = function() {
	this.refresh();
};
//=============================================================================
// CGMZ_Window_RecipeList
//-----------------------------------------------------------------------------
// Selectable window for choosing a recipe in a list.
//=============================================================================
function CGMZ_Window_RecipeList(rect) {
	this.initialize.apply(this, arguments);
}
CGMZ_Window_RecipeList.prototype = Object.create(Window_Selectable.prototype);
CGMZ_Window_RecipeList.prototype.constructor = CGMZ_Window_RecipeList;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Window_RecipeList.prototype.initialize = function(rect, craftType) {
	Window_Selectable.prototype.initialize.call(this, rect);
	this._craftType = craftType;
	this._filterMode = null;
	this._filterValue = null;
	this._category = null;
	this._data = [];
	this.refresh();
	this.select(0);
	this.setBackgroundType(2 * (CGMZ.Crafting.WindowTransparency));
};
//-----------------------------------------------------------------------------
// Add CGMZ Window Options
//-----------------------------------------------------------------------------
CGMZ_Window_RecipeList.prototype.CGMZ_createWindowOptions = function() {
	Window_Selectable.prototype.CGMZ_createWindowOptions.call(this);
	if(CGMZ.Crafting.ListWindowskin) this.cgmzOpts.windowskin = CGMZ.Crafting.ListWindowskin;
	if(CGMZ.Crafting.ListPadding >= 0) this.cgmzOpts.padding = CGMZ.Crafting.ListPadding;
	if(CGMZ.Crafting.ListBackOpacity >= 0) this.cgmzOpts.backOpacity = CGMZ.Crafting.ListBackOpacity;
	if(CGMZ.Crafting.ListTone?.Red >= -255) this.cgmzOpts.tone = [CGMZ.Crafting.ListTone.Red, CGMZ.Crafting.ListTone.Green, CGMZ.Crafting.ListTone.Blue];
};
//-----------------------------------------------------------------------------
// Update
//-----------------------------------------------------------------------------
CGMZ_Window_RecipeList.prototype.update = function() {
	Window_Selectable.prototype.update.call(this);
	if(Imported.CGMZ_Professions && $cgmzTemp._professionBuffRemoved) {
		$cgmzTemp._professionBuffRemoved = false;
		this.refresh();
		if(this.index() > this.topIndex()) this.select(this.topIndex());
	}
};
//-----------------------------------------------------------------------------
// Process ok
//-----------------------------------------------------------------------------
CGMZ_Window_RecipeList.prototype.processOk = function() {
	const item = this._data[this.index()];
	if(item && item.canCraft()) {
		this.playOkSound();
		this.updateInputData();
		this.callOkHandler();
	} else {
		SoundManager.playBuzzer();
	}
};
//-----------------------------------------------------------------------------
// Max items
//-----------------------------------------------------------------------------
CGMZ_Window_RecipeList.prototype.maxItems = function() {
	return this._data ? this._data.length : 1;
};
//-----------------------------------------------------------------------------
// Current item
//-----------------------------------------------------------------------------
CGMZ_Window_RecipeList.prototype.item = function() {
	return this._data[this.index()];
};
//-----------------------------------------------------------------------------
// Set the category for the list window
//-----------------------------------------------------------------------------
CGMZ_Window_RecipeList.prototype.setItem = function(category) {
	if(category && this._category && category === this._category) return;
	this._category = category;
	this.refresh();
};
//-----------------------------------------------------------------------------
// Set the filter mode for the window
//-----------------------------------------------------------------------------
CGMZ_Window_RecipeList.prototype.setFilterMode = function(mode, value) {
	if(mode === this._filterMode && value === this._filterValue) return;
	this._filterMode = mode;
	this._filterValue = value;
	this.refresh();
	this.smoothSelect(0);
};
//-----------------------------------------------------------------------------
// Refresh
//-----------------------------------------------------------------------------
CGMZ_Window_RecipeList.prototype.refresh = function() {
	this.makeItemList();
	Window_Selectable.prototype.refresh.call(this);
};
//-----------------------------------------------------------------------------
// Make item list
//-----------------------------------------------------------------------------
CGMZ_Window_RecipeList.prototype.makeItemList = function() {
	this._data = this.getRecipeList();
};
//-----------------------------------------------------------------------------
// Get a list of recipes
//-----------------------------------------------------------------------------
CGMZ_Window_RecipeList.prototype.getRecipeList = function() {
	let list = [];
	if(this._craftType.length === 0) {
		list = $cgmz.getAllDiscoveredRecipes();
	} else {
		for(const craftType of this._craftType) {
			list = list.concat($cgmz.getDiscoveredRecipesOfType(craftType));
		}
	}
	return list.filter(this.includeRecipeInList.bind(this));
};
//-----------------------------------------------------------------------------
// Determine if recipe should be included in list
//-----------------------------------------------------------------------------
CGMZ_Window_RecipeList.prototype.includeRecipeInList = function(recipe) {
	if(this._category) {
		if(recipe._profession !== this._category) return false;
	}
	if(CGMZ.Crafting.HideUncraftableRecipes && !recipe.canCraft()) return false;
	if(CGMZ.Crafting.HideHighLevelRecipes && !recipe.meetsLevelRequirements()) return false;
	if(!this.meetsFilterConditions(recipe)) return false;
	return true;
};
//-----------------------------------------------------------------------------
// Check any active filters
//-----------------------------------------------------------------------------
CGMZ_Window_RecipeList.prototype.meetsFilterConditions = function(recipe) {
	const tempRecipeData = $cgmzTemp.getRecipeTempData(recipe._name);
	if(!tempRecipeData) return true;
	switch(this._filterMode) {
		case 'category': return recipe._profession === this._filterValue;
		case 'quality': return tempRecipeData.quality === this._filterValue;
		case 'subcategory': return tempRecipeData.subcategory === this._filterValue;
	}
	return true;
};
//-----------------------------------------------------------------------------
// Draw item in list
//-----------------------------------------------------------------------------
CGMZ_Window_RecipeList.prototype.drawItem = function(index) {
	const item = this._data[index];
	const tempItem = $cgmzTemp.getRecipeTempData(item._name);
	if(!tempItem) return;
	const rect = this.itemRectWithPadding(index);
	const string = (tempItem.iconIndex) ? `\\i[${tempItem.iconIndex}]${tempItem.getName()}` : tempItem.getName();
	this.changePaintOpacity(item.canCraft());
	this.CGMZ_drawTextLine(string, rect.x, rect.y, rect.width, 'left');
	this.changePaintOpacity(true);
};
//-----------------------------------------------------------------------------
// Set display window
//-----------------------------------------------------------------------------
CGMZ_Window_RecipeList.prototype.setDisplayWindow = function(displayWindow) {
	this._displayWindow = displayWindow;
	this.callUpdateHelp();
};
//-----------------------------------------------------------------------------
// Set progress window
//-----------------------------------------------------------------------------
CGMZ_Window_RecipeList.prototype.setProgressWindow = function(progressWindow) {
	this._progressWindow = progressWindow;
	this.callUpdateHelp();
};
//-----------------------------------------------------------------------------
// See if can update display window
//-----------------------------------------------------------------------------
CGMZ_Window_RecipeList.prototype.callUpdateHelp = function() {
	if(this.active && this._displayWindow) {
		this._displayWindow.setItem(this.item());
	}
	if(this.active && this._progressWindow) {
		this._progressWindow.setItem(this.item());
	}
};
//-----------------------------------------------------------------------------
// If refresh is requested from other window
//-----------------------------------------------------------------------------
CGMZ_Window_RecipeList.prototype.requestRefresh = function() {
	this.refresh();
};
//=============================================================================
// CGMZ_Window_RecipeDisplay
//-----------------------------------------------------------------------------
// Window displaying recipe information
//=============================================================================
function CGMZ_Window_RecipeDisplay() {
	this.initialize.apply(this, arguments);
}
CGMZ_Window_RecipeDisplay.prototype = Object.create(CGMZ_Window_Scrollable.prototype);
CGMZ_Window_RecipeDisplay.prototype.constructor = CGMZ_Window_RecipeDisplay;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Window_RecipeDisplay.prototype.initialize = function(rect) {
	const heightMultiplier = 10; // maximum of 10 windows tall of data to scroll
	CGMZ_Window_Scrollable.prototype.initialize.call(this, rect, heightMultiplier, CGMZ.Crafting.ScrollWait, CGMZ.Crafting.ScrollSpeed, CGMZ.Crafting.AutoScroll, CGMZ.Crafting.ScrollDeceleration);
	this._recipe = null;
	this._largeIconWidth = ImageManager.iconWidth*2.2;
	this._largeIconHeight = ImageManager.iconHeight*2.2;
	this._iconBitmap = ImageManager.loadSystem('IconSet'); //only load this once
	this.deactivate();
	this.setBackgroundType(2 * (CGMZ.Crafting.WindowTransparency));
	this._iconSprite = new Sprite();
	this.addInnerChild(this._iconSprite);
};
//-----------------------------------------------------------------------------
// Add CGMZ Window Options
//-----------------------------------------------------------------------------
CGMZ_Window_RecipeDisplay.prototype.CGMZ_createWindowOptions = function() {
	CGMZ_Window_Scrollable.prototype.CGMZ_createWindowOptions.call(this);
	if(CGMZ.Crafting.DisplayWindowskin) this.cgmzOpts.windowskin = CGMZ.Crafting.DisplayWindowskin;
	if(CGMZ.Crafting.DisplayPadding >= 0) this.cgmzOpts.padding = CGMZ.Crafting.DisplayPadding;
	if(CGMZ.Crafting.DisplayBackOpacity >= 0) this.cgmzOpts.backOpacity = CGMZ.Crafting.DisplayBackOpacity;
	if(CGMZ.Crafting.DisplayTone?.Red >= -255) this.cgmzOpts.tone = [CGMZ.Crafting.DisplayTone.Red, CGMZ.Crafting.DisplayTone.Green, CGMZ.Crafting.DisplayTone.Blue];
};
//-----------------------------------------------------------------------------
// Update
//-----------------------------------------------------------------------------
CGMZ_Window_RecipeDisplay.prototype.update = function() {
	CGMZ_Window_Scrollable.prototype.update.call(this);
	if(Imported.CGMZ_Professions && this._recipe) {
		const profession = $cgmz.getProfession(this._recipe._profession);
		if(profession && profession._needRefreshForBuff) {
			this.refresh();
		}
	}
};
//-----------------------------------------------------------------------------
// Determine if the recipe shown can be crafted
//-----------------------------------------------------------------------------
CGMZ_Window_RecipeDisplay.prototype.canCraft = function() {
	if(this._recipe) return this._recipe.canCraft();
	return false;
};
//-----------------------------------------------------------------------------
// Set the recipe to be displayed (do nothing if already being displayed)
//-----------------------------------------------------------------------------
CGMZ_Window_RecipeDisplay.prototype.setItem = function(recipe) {
	if(this._recipe && recipe && this._recipe._name === recipe._name) return;
	this._recipe = recipe;
	this.setupWindowForNewEntry();
	this.refresh();
};
//-----------------------------------------------------------------------------
// Refresh
//-----------------------------------------------------------------------------
CGMZ_Window_RecipeDisplay.prototype.refresh = function() {
	this.contents.clear();
	this._iconSprite.hide();
	if(!this._recipe) {
		this.drawNoRecipeText();
		return;
	}
	const tempData = $cgmzTemp.getRecipeTempData(this._recipe._name);
	this._iconDisplacement = {yStart:0,yEnd:0,xStart:0,xEnd:0,isDisplaced:false};
	this._neededHeight = 0;
	if(tempData.image) {
		this.loadRecipeImage(tempData.image);
		return; // Draw the rest of the stuff after sprite is done loading
	}
	this.drawRecipeInfo();
};
//-----------------------------------------------------------------------------
// Draw text if there is no recipe selected
//-----------------------------------------------------------------------------
CGMZ_Window_RecipeDisplay.prototype.drawNoRecipeText = function() {
	this.CGMZ_drawText(CGMZ.Crafting.NoRecipeText, 0, 0, 0, this.contents.width, 'center');
	this._neededHeight += this.padding * 2;
	this.checkForScroll();
};
//-----------------------------------------------------------------------------
// Load recipe custom image
//-----------------------------------------------------------------------------
CGMZ_Window_RecipeDisplay.prototype.loadRecipeImage = function(img) {
	this._iconSprite.bitmap = ImageManager.loadPicture(img);
	this._iconSprite.bitmap.addLoadListener(this.drawRecipeInfo.bind(this));
};
//-----------------------------------------------------------------------------
// Display recipe custom image after load
//-----------------------------------------------------------------------------
CGMZ_Window_RecipeDisplay.prototype.displayPictureBitmap = function() {
	this._iconSprite.y = this._neededHeight;
	this._iconSprite.x = 0;
	this._iconSprite.show();
	this._iconDisplacement.yStart = this._neededHeight;
	this._iconDisplacement.yEnd = this._neededHeight + this._iconSprite.height;
	this._iconDisplacement.xEnd = this._iconSprite.width + 4;
	this._iconDisplacement.isDisplaced = true;
};
//-----------------------------------------------------------------------------
// Adjust available width for icon displacement (if any)
//-----------------------------------------------------------------------------
CGMZ_Window_RecipeDisplay.prototype.adjustWidthForIconDisplacement = function(width = this.contents.width) {
	if(!this._iconDisplacement.isDisplaced) return width;
	if(this._neededHeight >= this._iconDisplacement.yStart && this._neededHeight <= this._iconDisplacement.yEnd) {
		return width - this._iconDisplacement.xEnd;
	}
	return width;
};
//-----------------------------------------------------------------------------
// Adjust starting x for icon displacement (if any)
//-----------------------------------------------------------------------------
CGMZ_Window_RecipeDisplay.prototype.adjustXForIconDisplacement = function(x = 0) {
	if(!this._iconDisplacement.isDisplaced) return x;
	if(this._neededHeight >= this._iconDisplacement.yStart && this._neededHeight <= this._iconDisplacement.yEnd) {
		return x + this._iconDisplacement.xEnd;
	}
	return x;
};
//-----------------------------------------------------------------------------
// Draw Recipe info after loading everything
//-----------------------------------------------------------------------------
CGMZ_Window_RecipeDisplay.prototype.drawRecipeInfo = function() {
	const recipe = this._recipe;
	const tempRecipeData = $cgmzTemp.getRecipeTempData(recipe._name);
	for(const section of CGMZ.Crafting.DisplayWindowInfo) {
		switch(section) {
			case "Name": this.drawRecipeName(tempRecipeData.getName()); break;
			case "Image":
				if(tempRecipeData.image) {
					this.displayPictureBitmap();
				} else if(tempRecipeData.iconIndex > 0) {
					this.drawLargeIcon(tempRecipeData.iconIndex);
				}
				break;
			case "Times Crafted": this.drawRecipeStandardLine(CGMZ.Crafting.TimesCraftedText, recipe._timesCrafted); break;
			case "Success Rate": this.drawRecipeStandardLine(CGMZ.Crafting.SuccessRateText, recipe.calculateSuccessRate() + "%"); break;
			case "High Quality Rate": this.drawRecipeStandardLine(CGMZ.Crafting.HighQualityRateText, recipe.calculateHighQualityRate() + "%"); break;
			case "Quality": this.drawRecipeStandardLine(CGMZ.Crafting.QualityLabelText, tempRecipeData.quality); break;
			case "Subcategory": this.drawRecipeStandardLine(CGMZ.Crafting.SubcategoryLabelText, tempRecipeData.subcategory); break;
			case "Exp":
				if(Imported.CGMZ_Professions && $cgmz.getProfession(recipe._profession)) {
					this.drawRecipeStandardLine(CGMZ.Crafting.ExpText, tempRecipeData.experience);
				}
				break;
			case "Level Required":
				if(Imported.CGMZ_Professions && $cgmz.getProfession(recipe._profession)) {
					this.drawRecipeStandardLine(CGMZ.Crafting.LevelReqText, recipe._profession + " " + CGMZ.Crafting.LevelAbbrText + " " + tempRecipeData.levelRequirement);
				}
				break;
			case "Current Level":
				if(Imported.CGMZ_Professions && $cgmz.getProfession(recipe._profession)) {
					this.drawRecipeStandardLine(recipe._profession + " " + CGMZ.Crafting.CurrentLevelText, $cgmz.getProfession(recipe._profession).getBuffedLevel());
				}
				break;
			case "Description": this._neededHeight += this.drawRecipeDescription(recipe._description); break;
			case "Products":
				this.drawRecipeUniqueAmount(tempRecipeData.productUniqueAmount);
				this.drawRecipeItems(tempRecipeData.products, true, CGMZ.Crafting.ShowProductAmount);
				break;
			case "Tools": this.drawRecipeItems(tempRecipeData.tools, false, CGMZ.Crafting.ShowToolAmount); break;
			case "Ingredients": this.drawRecipeItems(tempRecipeData.ingredients, false, CGMZ.Crafting.ShowIngredientAmount); break;
			case "Fail Products": this.drawRecipeItems(tempRecipeData.failProducts, true, CGMZ.Crafting.ShowFailProductAmount); break;
			case "High Quality Products": this.drawRecipeItems(tempRecipeData.hqproducts, true, CGMZ.Crafting.ShowHighQualityProductAmount); break;
			case "Info Header": this._neededHeight += this.CGMZ_drawHeader(CGMZ.Crafting.InfoHeaderText, this._neededHeight, CGMZ.Crafting.HeaderColor1, CGMZ.Crafting.HeaderColor2); break;
			case "Description Header": this._neededHeight += this.CGMZ_drawHeader(CGMZ.Crafting.DescHeaderText, this._neededHeight, CGMZ.Crafting.HeaderColor1, CGMZ.Crafting.HeaderColor2); break;
			case "Product Header":
				if(tempRecipeData.products.length > 0) {
					this._neededHeight += this.CGMZ_drawHeader(CGMZ.Crafting.ProductHeaderText, this._neededHeight, CGMZ.Crafting.HeaderColor1, CGMZ.Crafting.HeaderColor2);
				}
				break;
			case "Tool Header":
				if(tempRecipeData.tools.length > 0) {
					this._neededHeight += this.CGMZ_drawHeader(CGMZ.Crafting.ToolHeaderText, this._neededHeight, CGMZ.Crafting.HeaderColor1, CGMZ.Crafting.HeaderColor2);
				}
				break;
			case "Ingredient Header":
				if(tempRecipeData.ingredients.length > 0) {
					this._neededHeight += this.CGMZ_drawHeader(CGMZ.Crafting.IngredientHeaderText, this._neededHeight, CGMZ.Crafting.HeaderColor1, CGMZ.Crafting.HeaderColor2);
				}
				break;
			case "Fail Product Header":
				if(tempRecipeData.failProducts.length > 0) {
					this._neededHeight += this.CGMZ_drawHeader(CGMZ.Crafting.FailProductHeaderText, this._neededHeight, CGMZ.Crafting.HeaderColor1, CGMZ.Crafting.HeaderColor2);
				}
				break;
			case "High Quality Product Header":
				if(tempRecipeData.hqproducts.length > 0) {
					this._neededHeight += this.CGMZ_drawHeader(CGMZ.Crafting.HighQualityProductHeaderText, this._neededHeight, CGMZ.Crafting.HeaderColor1, CGMZ.Crafting.HeaderColor2);
				}
				break;
			case "Blank Line": this._neededHeight += this.lineHeight(); break;
			case "Custom Space": this._neededHeight += CGMZ.Crafting.CustomSpace; break;
		}
	}
	this._neededHeight += this.padding * 2;
	this.checkForScroll();
};
//-----------------------------------------------------------------------------
// Draw Name of recipe
//-----------------------------------------------------------------------------
CGMZ_Window_RecipeDisplay.prototype.drawRecipeName = function(name) {
	this.contents.fontBold = true;
	this._neededHeight += this.CGMZ_drawTextLine(name, 0, this._neededHeight, this.contents.width, 'center');
	this.contents.fontBold = false;
};
//-----------------------------------------------------------------------------
// Draw recipe description - returns height needed for description
//-----------------------------------------------------------------------------
CGMZ_Window_RecipeDisplay.prototype.drawRecipeDescription = function(description) {
	return this.CGMZ_drawText(description, 0, 0, this._neededHeight, this.contents.width, CGMZ.Crafting.DescriptionAlignment);
};
//-----------------------------------------------------------------------------
// Draws a standard line
//-----------------------------------------------------------------------------
CGMZ_Window_RecipeDisplay.prototype.drawRecipeStandardLine = function(descriptor1, descriptor2) {
	const x = this.adjustXForIconDisplacement();
	const width = this.adjustWidthForIconDisplacement();
	const totalString = '\\c[' + CGMZ.Crafting.LabelColor + ']' + descriptor1 + '\\c[0]' + descriptor2;
	this._neededHeight += this.CGMZ_drawTextLine(totalString, x, this._neededHeight, width, 'left');
};
//-----------------------------------------------------------------------------
// Draw large icon
//-----------------------------------------------------------------------------
CGMZ_Window_RecipeDisplay.prototype.drawLargeIcon = function(iconIndex) {
	const bitmap = this._iconBitmap;
	const pw = ImageManager.iconWidth;
	const ph = ImageManager.iconHeight;
	const sx = iconIndex % 16 * pw;
	const sy = Math.floor(iconIndex / 16) * ph;
	const dw = this._largeIconWidth;
	const dh = this._largeIconHeight;
	const x = 0;
	const y = this._neededHeight;
	this.contents.blt(bitmap, sx, sy, pw, ph, x, y, dw, dh);
	this._iconDisplacement.yStart = this._neededHeight;
	this._iconDisplacement.yEnd = this._neededHeight + this._largeIconHeight;
	this._iconDisplacement.xEnd = this._largeIconWidth + 4;
	this._iconDisplacement.isDisplaced = true;
};
//-----------------------------------------------------------------------------
// Draw regular icon
//-----------------------------------------------------------------------------
CGMZ_Window_RecipeDisplay.prototype.drawIcon = function(iconIndex, x, y) {
	const bitmap = this._iconBitmap;
	const pw = ImageManager.iconWidth;
	const ph = ImageManager.iconHeight;
	const sx = iconIndex % 16 * pw;
	const sy = Math.floor(iconIndex / 16) * ph;
	this.contents.blt(bitmap, sx, sy, pw, ph, x, y);
};
//-----------------------------------------------------------------------------
// Draw Item Lists
//-----------------------------------------------------------------------------
CGMZ_Window_RecipeDisplay.prototype.drawRecipeUniqueAmount = function(amount) {
	if(!amount || !CGMZ.Crafting.ShowUniqueProductAmount) return;
	const string = CGMZ.Crafting.UniqueText.replace(/%unique/gi, String(amount));
	this._neededHeight += this.CGMZ_drawTextLine(string, 0, this._neededHeight, this.contents.width, 'center');
};
//-----------------------------------------------------------------------------
// Draw Item Lists
//-----------------------------------------------------------------------------
CGMZ_Window_RecipeDisplay.prototype.drawRecipeItems = function(itemArray, product, showAmount) {
	if(itemArray.length === 0) return;
	for(const itemObj of itemArray) {
		if(itemObj.Type === 'currency') {
			let currentSupply = $gameParty.gold();
			let unit = TextManager.currencyUnit;
			if(Imported.CGMZ_CurrencySystem && itemObj.ID) {
				const CScurrency = $cgmz.getCurrency(itemObj.ID);
				const CScurrencyTemp = $cgmzTemp.getCurrency(itemObj.ID);
				if(CScurrency && CScurrencyTemp) {
					currentSupply = CScurrency.amount();
					unit = `\\c[${CScurrencyTemp._color}]${CScurrencyTemp._unit}\\c[0]`;
				}
			}
			const amount = itemObj.Amount + unit;
			this.changePaintOpacity(product || itemObj.Amount <= currentSupply);
			const currentAmount = (showAmount) ? ` (${currentSupply})` : "";
			const string = amount + currentAmount;
			this._neededHeight += this.CGMZ_drawText(string, 0, 0, this._neededHeight, this.contents.width, 'center');
		} else if(itemObj.Type === 'generic') {
			const currentSupply = $cgmzTemp.calculateTotalNumItemsOfGenericType(itemObj.GenericCategory);
			this.changePaintOpacity(itemObj.Amount <= currentSupply);
			const amount = itemObj.Amount + CGMZ.Crafting.AmountXText;
			const currentAmount = (showAmount) ? ` (${currentSupply})` : "";
			const itemData = $cgmzTemp.getGenericCraftingItem(itemObj.GenericCategory);
			let string = amount;
			string += (itemData._iconIndex) ? '\\i[' + itemData._iconIndex + '] ' : "";
			string += (itemData._name + currentAmount);
			this._neededHeight += this.CGMZ_drawText(string, 0, 0, this._neededHeight, this.contents.width, 'center');
		} else {
			const item = CGMZ_Utils.lookupItem(itemObj.Type, itemObj.ID);
			if(item) {
				const currentSupply = $gameParty.numItems(item);
				const amount = itemObj.Amount + CGMZ.Crafting.AmountXText;
				const name = item.name;
				const iconIndex = item.iconIndex;
				this.changePaintOpacity(product || itemObj.Amount <= currentSupply);
				const currentAmount = (showAmount) ? ` (${currentSupply})` : "";
				const string = amount + "\\i[" + iconIndex + "]" + name + currentAmount;
				this._neededHeight += this.CGMZ_drawText(string, 0, 0, this._neededHeight, this.contents.width, 'center');
			}
		}
	}
	this.changePaintOpacity(true);
};
//=============================================================================
// CGMZ_Window_RecipeProgress
//-----------------------------------------------------------------------------
// Window displaying crafting progress
//=============================================================================
function CGMZ_Window_RecipeProgress() {
	this.initialize.apply(this, arguments);
}
CGMZ_Window_RecipeProgress.prototype = Object.create(Window_Base.prototype);
CGMZ_Window_RecipeProgress.prototype.constructor = CGMZ_Window_RecipeProgress;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Window_RecipeProgress.prototype.initialize = function(rect, sceneKey) {
	Window_Base.prototype.initialize.call(this, rect);
	this._sceneKey = sceneKey;
	this.resetWindow();
	this.setBackgroundType(2 * (CGMZ.Crafting.WindowTransparency));
};
//-----------------------------------------------------------------------------
// Reset the window
//-----------------------------------------------------------------------------
CGMZ_Window_RecipeProgress.prototype.resetWindow = function() {
	this._recipe = null;
	this._timerKey = "";
	this._timer = null;
	this._resultTimer = 0;
	this._craftResult = "";
	this._needsUpdate = false;
	this.refresh();
};
//-----------------------------------------------------------------------------
// Add CGMZ Window Options
//-----------------------------------------------------------------------------
CGMZ_Window_RecipeProgress.prototype.CGMZ_createWindowOptions = function() {
	Window_Base.prototype.CGMZ_createWindowOptions.call(this);
	if(CGMZ.Crafting.ProgressWindowskin) this.cgmzOpts.windowskin = CGMZ.Crafting.ProgressWindowskin;
	if(CGMZ.Crafting.ProgressPadding >= 0) this.cgmzOpts.padding = CGMZ.Crafting.ProgressPadding;
	if(CGMZ.Crafting.ProgressBackOpacity >= 0) this.cgmzOpts.backOpacity = CGMZ.Crafting.ProgressBackOpacity;
	if(CGMZ.Crafting.ProgressTone?.Red >= -255) this.cgmzOpts.tone = [CGMZ.Crafting.ProgressTone.Red, CGMZ.Crafting.ProgressTone.Green, CGMZ.Crafting.ProgressTone.Blue];
};
//-----------------------------------------------------------------------------
// Determine if progress window can craft
//-----------------------------------------------------------------------------
CGMZ_Window_RecipeProgress.prototype.canCraft = function() {
	return !this._needsUpdate;
};
//-----------------------------------------------------------------------------
// Start the crafting process
//-----------------------------------------------------------------------------
CGMZ_Window_RecipeProgress.prototype.startCraft = function(amount) {
	if(this._recipe) {
		this._recipe.startCraft();
		const ext = $cgmzTemp.makeCraftTimerInfo(this._recipe._name, this._timerKey, amount);
		const timer = new CGMZ_Timer(
			ext.timeNeeded,
			this._timerKey,
			"onCraftTimerFinish",
			ext
		);
		$cgmz.requestNewTimer(timer);
		this._needsUpdate = true;
		this._timer = $cgmz.getTimerById(this._timerKey);
	}
};
//-----------------------------------------------------------------------------
// Do an instant craft
//-----------------------------------------------------------------------------
CGMZ_Window_RecipeProgress.prototype.doInstantCraft = function(amount) {
	if(this._recipe) {
		let success = true;
		for(let i = 0; i < amount; i++) {
			const ext = $cgmzTemp.makeCraftTimerInfo(this._recipe._name, this._timerKey, amount);
			this._recipe.doCraft(ext.success, ext.hq);
			if(!ext.success) success = false;
		}
		const recipeTemp = $cgmzTemp.getRecipeTempData(this._recipe._name);
		if(recipeTemp) {
			const se = success ? recipeTemp.successSE : recipeTemp.failSE;
			AudioManager.playSe(se);
		}
		if(Imported.CGMZ_Rumble) {
			success ? $cgmzTemp.startRumble(CGMZ.Crafting.SuccessRumble) : $cgmzTemp.startRumble(CGMZ.Crafting.FailRumble)
		}
	}
};
//-----------------------------------------------------------------------------
// Update the crafting process
//-----------------------------------------------------------------------------
CGMZ_Window_RecipeProgress.prototype.update = function() {
	Window_Base.prototype.update.call(this);
	if(this._needsUpdate) this.refresh();
};
//-----------------------------------------------------------------------------
// Set the recipe to be displayed
//-----------------------------------------------------------------------------
CGMZ_Window_RecipeProgress.prototype.setItem = function(recipe) {
	this._recipe = recipe;
	if(recipe) {
		this._timerKey = $cgmzTemp.createCraftingTimerKey(recipe._name, this._sceneKey);
		this._timer = $cgmz.getTimerById(this._timerKey);
		if(this._timer) {
			const info = this._timer._args;
			this._needsUpdate = true;
			this._resultTimer = 0;
			this._craftResult = "";
		}
	} else {
		this._timer = null;
		this._timerKey = "";
		this._resultTimer = 0;
		this._craftResult = "";
		this._needsUpdate = false;
	}
	this.refresh();
};
//-----------------------------------------------------------------------------
// Reset for a new recipe
//-----------------------------------------------------------------------------
CGMZ_Window_RecipeProgress.prototype.resetForNextCraft = function() {
	if(this._recipe) {
		this._timerKey = $cgmzTemp.createCraftingTimerKey(this._recipe._name, this._sceneKey);
		this._timer = $cgmz.getTimerById(this._timerKey);
		if(this._timer) {
			const info = this._timer._args;
			this._resultTimer = 0;
			this._craftResult = "";
			this._needsUpdate = true;
		}
	}
	this.refresh();
};
//-----------------------------------------------------------------------------
// Reset for a new recipe
//-----------------------------------------------------------------------------
CGMZ_Window_RecipeProgress.prototype.startDisplayCraftResult = function(success, hq) {
	this._resultTimer = 0;
	if(success && hq) {
		this._craftResult = `\\c[${CGMZ.Crafting.HighQualityColor}]${CGMZ.Crafting.HighQualityText}\\c[0]`;
	} else if(success) {
		this._craftResult = `\\c[${CGMZ.Crafting.SuccessColor}]${CGMZ.Crafting.SuccessText}\\c[0]`;
	} else {
		this._craftResult = `\\c[${CGMZ.Crafting.FailureColor}]${CGMZ.Crafting.FailureText}\\c[0]`;
	}
	this._needsUpdate = true;
};
//-----------------------------------------------------------------------------
// Refresh the window contents
//-----------------------------------------------------------------------------
CGMZ_Window_RecipeProgress.prototype.refresh = function() {
	this.contents.clear();
	if(this._timer) {
		const currentlyCrafting = true;
		this.drawCraftProgress(currentlyCrafting);
	} else {
		this.drawCraftResult();
	}
};
//-----------------------------------------------------------------------------
// Draw the craft progress
//-----------------------------------------------------------------------------
CGMZ_Window_RecipeProgress.prototype.drawCraftProgress = function(currentlyCrafting = false) {
	this.CGMZ_drawTextLine(CGMZ.Crafting.ProgressText, 0, 0, this.contents.width, 'left');
	const color1 = ColorManager.textColor(CGMZ.Crafting.ProgressColor1);
	const color2 = ColorManager.textColor(CGMZ.Crafting.ProgressColor2);
	const x = this.CGMZ_textSizeEx(CGMZ.Crafting.ProgressText).width;
	const rect = new Rectangle(x, 0, this.contents.width - x, this.lineHeight());
	const rate = this.makeProgressRate(currentlyCrafting);
	this.CGMZ_drawGauge(rect, rate, color1, color2);
	if(currentlyCrafting) {
		if(CGMZ.Crafting.ShowProgressPercentage) {
			const string = (CGMZ.Crafting.ProgressDecimals) ? (rate*100.0).toFixed(CGMZ.Crafting.ProgressDecimals) : Math.floor(rate*100.0);
			this.CGMZ_drawTextLine(`${string}${CGMZ.Crafting.PercentText}`, x, 0, this.contents.width - x, 'center');
		} else if(CGMZ.Crafting.ShowProgressTimeRemaining) {
			const timeRemaining = this.makeTimeRemaining();
			this.CGMZ_drawTextLine(timeRemaining, x, 0, this.contents.width - x, 'center');
		}
		const info = this._timer._args;
		const startFrame = info.currentTime;
		const currentFrame = Graphics.frameCount - startFrame;
		const endFrame = info.timeNeeded;
		if(currentFrame >= endFrame) {
			this._timer = null;
			this._timerKey = "";
		}
	}
};
//-----------------------------------------------------------------------------
// Calculate the rate of the progress bar (returns 0 if not currently crafting)
//-----------------------------------------------------------------------------
CGMZ_Window_RecipeProgress.prototype.makeProgressRate = function(currentlyCrafting) {
	if(!currentlyCrafting) return 0.0;
	const info = this._timer._args;
	const startFrame = info.currentTime;
	const currentFrame = Graphics.frameCount - startFrame;
	const endFrame = info.fullRecipeCraftTime;
	return currentFrame / endFrame;
};
//-----------------------------------------------------------------------------
// Calculate the time remaining, return string for display
//-----------------------------------------------------------------------------
CGMZ_Window_RecipeProgress.prototype.makeTimeRemaining = function() {
	const info = this._timer._args;
	const currentFrame = Graphics.frameCount;
	const endFrame = info.fullRecipeCraftTime;
	const time = endFrame - currentFrame;
	const seconds = Math.ceil(time / 60);
	if(seconds < 60) return seconds + CGMZ.Crafting.SecText;
	const minutes = Math.ceil(seconds / 60);
	if(minutes < 60) return minutes + CGMZ.Crafting.MinText;
	const hr = Math.ceil(minutes / 60);
	return hr + CGMZ.Crafting.HrText;
};
//-----------------------------------------------------------------------------
// Draw craft result
//-----------------------------------------------------------------------------
CGMZ_Window_RecipeProgress.prototype.drawCraftResult = function() {
	if(this._craftResult) {
		this.CGMZ_drawTextLine(this._craftResult, 0, 0, this.contents.width, 'center');
		this._resultTimer++;
		if(this._resultTimer > 60) {
			this._resultTimer = 0;
			this._craftResult = "";
		}
	} else {
		this._needsUpdate = false;
		const currentlyCrafting = false;
		this.drawCraftProgress(currentlyCrafting);
	}
};
//=============================================================================
// CGMZ_Window_CraftConfirmation
//-----------------------------------------------------------------------------
// Handle CGMZ craft confirmation / cancel
//=============================================================================
function CGMZ_Window_CraftConfirmation() {
	this.initialize(...arguments);
}
CGMZ_Window_CraftConfirmation.prototype = Object.create(Window_Command.prototype);
CGMZ_Window_CraftConfirmation.prototype.constructor = CGMZ_Window_CraftConfirmation;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Window_CraftConfirmation.prototype.initialize = function(rect) {
	Window_Command.prototype.initialize.call(this, rect);
	this._waitTime = 10;
	this.deactivate();
	this.hide();
};
//-----------------------------------------------------------------------------
// Add CGMZ Window Options
//-----------------------------------------------------------------------------
CGMZ_Window_CraftConfirmation.prototype.CGMZ_createWindowOptions = function() {
	Window_Command.prototype.CGMZ_createWindowOptions.call(this);
	if(CGMZ.Crafting.ConfirmWindowskin) this.cgmzOpts.windowskin = CGMZ.Crafting.ConfirmWindowskin;
	if(CGMZ.Crafting.ConfirmPadding >= 0) this.cgmzOpts.padding = CGMZ.Crafting.ConfirmPadding;
	if(CGMZ.Crafting.ConfirmBackOpacity >= 0) this.cgmzOpts.backOpacity = CGMZ.Crafting.ConfirmBackOpacity;
	if(CGMZ.Crafting.ConfirmTone?.Red >= -255) this.cgmzOpts.tone = [CGMZ.Crafting.ConfirmTone.Red, CGMZ.Crafting.ConfirmTone.Green, CGMZ.Crafting.ConfirmTone.Blue];
};
//-----------------------------------------------------------------------------
// Add commands
//-----------------------------------------------------------------------------
CGMZ_Window_CraftConfirmation.prototype.makeCommandList = function() {
	this.addCommand(CGMZ.Crafting.CraftConfirmText, "craft", true);
	this.addCommand(CGMZ.Crafting.CraftCancelText, "cancel", true);
};
//-----------------------------------------------------------------------------
// Add a wait period before being active after show
//-----------------------------------------------------------------------------
CGMZ_Window_CraftConfirmation.prototype.show = function() {
	Window_Command.prototype.show.call(this);
	this._waitTime = 5;
};
//-----------------------------------------------------------------------------
// Only allow OK trigger after wait time is over to prevent instant selection
//-----------------------------------------------------------------------------
CGMZ_Window_CraftConfirmation.prototype.isOkTriggered = function() {
	const triggered = Window_Command.prototype.isOkTriggered.call(this);
	return triggered && this._waitTime <= 0;
};
//-----------------------------------------------------------------------------
// Determine if OK is actually triggered
//-----------------------------------------------------------------------------
CGMZ_Window_CraftConfirmation.prototype.update = function() {
	Window_Command.prototype.update.call(this);
	this._waitTime--;
	if(this._waitTime < 0) this._waitTime = 0;
};
//=============================================================================
// CGMZ_Window_Multicraft
//-----------------------------------------------------------------------------
// Handle multicraft select
//=============================================================================
function CGMZ_Window_Multicraft() {
	this.initialize(...arguments);
}
CGMZ_Window_Multicraft.prototype = Object.create(Window_Selectable.prototype);
CGMZ_Window_Multicraft.prototype.constructor = CGMZ_Window_Multicraft;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Window_Multicraft.prototype.initialize = function(rect) {
	Window_Selectable.prototype.initialize.call(this, rect);
	this._item = null;
	this._max = 1;
	this._number = 1;
	this.createButtons();
	this.placeButtons();
	this.deactivate();
	this.hide();
	this._canRepeat = false;
};
//-----------------------------------------------------------------------------
// Add CGMZ Window Options
//-----------------------------------------------------------------------------
CGMZ_Window_Multicraft.prototype.CGMZ_createWindowOptions = function() {
	Window_Selectable.prototype.CGMZ_createWindowOptions.call(this);
	if(CGMZ.Crafting.MulticraftWindowskin) this.cgmzOpts.windowskin = CGMZ.Crafting.MulticraftWindowskin;
	if(CGMZ.Crafting.MulticraftPadding >= 0) this.cgmzOpts.padding = CGMZ.Crafting.MulticraftPadding;
	if(CGMZ.Crafting.MulticraftBackOpacity >= 0) this.cgmzOpts.backOpacity = CGMZ.Crafting.MulticraftBackOpacity;
	if(CGMZ.Crafting.MulticraftTone?.Red >= -255) this.cgmzOpts.tone = [CGMZ.Crafting.MulticraftTone.Red, CGMZ.Crafting.MulticraftTone.Green, CGMZ.Crafting.MulticraftTone.Blue];
};
//-----------------------------------------------------------------------------
// Disable scroll
//-----------------------------------------------------------------------------
CGMZ_Window_Multicraft.prototype.isScrollEnabled = function() {
	return false;
};
//-----------------------------------------------------------------------------
// Get the number to craft
//-----------------------------------------------------------------------------
CGMZ_Window_Multicraft.prototype.number = function() {
	return this._number;
};
//-----------------------------------------------------------------------------
// Setup the window with max amount to craft
//-----------------------------------------------------------------------------
CGMZ_Window_Multicraft.prototype.setup = function(max) {
	this._max = max;
	this._number = 1;
	this.refresh();
};
//-----------------------------------------------------------------------------
// Create the buttons
//-----------------------------------------------------------------------------
CGMZ_Window_Multicraft.prototype.createButtons = function() {
	this._buttons = [];
	if (ConfigManager.touchUI) {
		for (const type of ["down2", "down", "up", "up2", "ok"]) {
			const button = new Sprite_Button(type);
			this._buttons.push(button);
			this.addInnerChild(button);
		}
		this._buttons[0].setClickHandler(this.onButtonDown2.bind(this));
		this._buttons[1].setClickHandler(this.onButtonDown.bind(this));
		this._buttons[2].setClickHandler(this.onButtonUp.bind(this));
		this._buttons[3].setClickHandler(this.onButtonUp2.bind(this));
		this._buttons[4].setClickHandler(this.onButtonOk.bind(this));
	}
};
//-----------------------------------------------------------------------------
// Place the buttons
//-----------------------------------------------------------------------------
CGMZ_Window_Multicraft.prototype.placeButtons = function() {
	const sp = this.buttonSpacing();
	const totalWidth = this.totalButtonWidth();
	let x = (this.innerWidth - totalWidth) / 2;
	for (const button of this._buttons) {
		button.x = x;
		button.y = this.buttonY();
		x += button.width + sp;
	}
};
//-----------------------------------------------------------------------------
// Get total button width
//-----------------------------------------------------------------------------
CGMZ_Window_Multicraft.prototype.totalButtonWidth = function() {
	const sp = this.buttonSpacing();
	return this._buttons.reduce((r, button) => r + button.width + sp, -sp);
};
//-----------------------------------------------------------------------------
// Get button spacing
//-----------------------------------------------------------------------------
CGMZ_Window_Multicraft.prototype.buttonSpacing = function() {
	return 8;
};
//-----------------------------------------------------------------------------
// Refresh the window
//-----------------------------------------------------------------------------
CGMZ_Window_Multicraft.prototype.refresh = function() {
	Window_Selectable.prototype.refresh.call(this);
	this.drawQuantityText();
	this.drawNumber();
};
//-----------------------------------------------------------------------------
// Draw Quantity Text
//-----------------------------------------------------------------------------
CGMZ_Window_Multicraft.prototype.drawQuantityText = function() {
	this.CGMZ_drawTextLine(CGMZ.Crafting.CraftQuantityText, 0, 0, this.contents.width, 'left');
};
//-----------------------------------------------------------------------------
// Draw current quantity
//-----------------------------------------------------------------------------
CGMZ_Window_Multicraft.prototype.drawNumber = function() {
	this.CGMZ_drawTextLine("" + this._number, 0, 0, this.contents.width, "right");
};
//-----------------------------------------------------------------------------
// Get button y coordinate
//-----------------------------------------------------------------------------
CGMZ_Window_Multicraft.prototype.buttonY = function() {
	return this.lineHeight();
};
//-----------------------------------------------------------------------------
// Update window
//-----------------------------------------------------------------------------
CGMZ_Window_Multicraft.prototype.update = function() {
	Window_Selectable.prototype.update.call(this);
	this.processNumberChange();
};
//-----------------------------------------------------------------------------
// Do not play ok sound
//-----------------------------------------------------------------------------
CGMZ_Window_Multicraft.prototype.playOkSound = function() {
};
//-----------------------------------------------------------------------------
// Process a number change
//-----------------------------------------------------------------------------
CGMZ_Window_Multicraft.prototype.processNumberChange = function() {
	if (this.isOpenAndActive()) {
		if(Input.isRepeated("right")) {
			this.changeNumber(1);
		}
		if(Input.isRepeated("left")) {
			this.changeNumber(-1);
		}
		if(Input.isRepeated("up")) {
			this.changeNumber(10);
		}
		if(Input.isRepeated("down")) {
			this.changeNumber(-10);
		}
	}
};
//-----------------------------------------------------------------------------
// Change the number
//-----------------------------------------------------------------------------
CGMZ_Window_Multicraft.prototype.changeNumber = function(amount) {
	const lastNumber = this._number;
	this._number = (this._number + amount).clamp(1, this._max);
	if(this._number !== lastNumber) {
		this.playCursorSound();
		this.refresh();
	}
};
//-----------------------------------------------------------------------------
// Disable touch
//-----------------------------------------------------------------------------
CGMZ_Window_Multicraft.prototype.isTouchOkEnabled = function() {
	return false;
};
//-----------------------------------------------------------------------------
// Processing for button up
//-----------------------------------------------------------------------------
CGMZ_Window_Multicraft.prototype.onButtonUp = function() {
	this.changeNumber(1);
};
//-----------------------------------------------------------------------------
// Processing for button up 2
//-----------------------------------------------------------------------------
CGMZ_Window_Multicraft.prototype.onButtonUp2 = function() {
	this.changeNumber(10);
};
//-----------------------------------------------------------------------------
// Processing for button down
//-----------------------------------------------------------------------------
CGMZ_Window_Multicraft.prototype.onButtonDown = function() {
	this.changeNumber(-1);
};
//-----------------------------------------------------------------------------
// Processing for button down 2
//-----------------------------------------------------------------------------
CGMZ_Window_Multicraft.prototype.onButtonDown2 = function() {
	this.changeNumber(-10);
};
//-----------------------------------------------------------------------------
// Processing for button ok
//-----------------------------------------------------------------------------
CGMZ_Window_Multicraft.prototype.onButtonOk = function() {
	this.processOk();
};
//=============================================================================
// CGMZ_Window_FilterType
//-----------------------------------------------------------------------------
// Selectable window for choosing a filter type
//=============================================================================
function CGMZ_Window_FilterType(rect) {
	this.initialize.apply(this, arguments);
}
CGMZ_Window_FilterType.prototype = Object.create(Window_Selectable.prototype);
CGMZ_Window_FilterType.prototype.constructor = CGMZ_Window_FilterType;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Window_FilterType.prototype.initialize = function(rect) {
	Window_Selectable.prototype.initialize.call(this, rect);
	this._data = [];
	this.refresh();
	this.setBackgroundType(2 * (CGMZ.Crafting.WindowTransparency));
	this.deactivate();
	this.hide();
};
//-----------------------------------------------------------------------------
// Add CGMZ Window Options
//-----------------------------------------------------------------------------
CGMZ_Window_FilterType.prototype.CGMZ_createWindowOptions = function() {
	Window_Selectable.prototype.CGMZ_createWindowOptions.call(this);
	if(CGMZ.Crafting.CategoryWindowskin) this.cgmzOpts.windowskin = CGMZ.Crafting.CategoryWindowskin;
	if(CGMZ.Crafting.CategoryPadding >= 0) this.cgmzOpts.padding = CGMZ.Crafting.CategoryPadding;
	if(CGMZ.Crafting.CategoryBackOpacity >= 0) this.cgmzOpts.backOpacity = CGMZ.Crafting.CategoryBackOpacity;
	if(CGMZ.Crafting.CategoryTone?.Red >= -255) this.cgmzOpts.tone = [CGMZ.Crafting.CategoryTone.Red, CGMZ.Crafting.CategoryTone.Green, CGMZ.Crafting.CategoryTone.Blue];
};
//-----------------------------------------------------------------------------
// Max items
//-----------------------------------------------------------------------------
CGMZ_Window_FilterType.prototype.maxItems = function() {
	return this._data ? this._data.length : 1;
};
//-----------------------------------------------------------------------------
// Current item
//-----------------------------------------------------------------------------
CGMZ_Window_FilterType.prototype.item = function() {
	return this._data[this.index()];
};
//-----------------------------------------------------------------------------
// Refresh
//-----------------------------------------------------------------------------
CGMZ_Window_FilterType.prototype.refresh = function(filters) {
	this.makeItemList(filters);
	Window_Selectable.prototype.refresh.call(this);
};
//-----------------------------------------------------------------------------
// Make item list
//-----------------------------------------------------------------------------
CGMZ_Window_FilterType.prototype.makeItemList = function(filters) {
	this._data = [];
	this._data.push("remove");
	if(filters?.category?.length) this._data.push("category");
	if(filters?.subcategory?.length) this._data.push("subcategory");
	if(filters?.quality?.length) this._data.push("quality");
};
//-----------------------------------------------------------------------------
// Draw item in list
//-----------------------------------------------------------------------------
CGMZ_Window_FilterType.prototype.drawItem = function(index) {
	const table = {
		remove: CGMZ.Crafting.RemoveFilterText,
		category: CGMZ.Crafting.CategoryFilterText,
		subcategory: CGMZ.Crafting.SubcategoryFilterText,
		quality: CGMZ.Crafting.QualityFilterText
	}
	const item = table[this._data[index]];
	const rect = this.itemRectWithPadding(index);
	this.CGMZ_drawTextLine(item, rect.x, rect.y, rect.width, 'center');
};
//=============================================================================
// CGMZ_Window_FilterOption
//-----------------------------------------------------------------------------
// Selectable window for choosing a filter option
//=============================================================================
function CGMZ_Window_FilterOption(rect) {
	this.initialize.apply(this, arguments);
}
CGMZ_Window_FilterOption.prototype = Object.create(Window_Selectable.prototype);
CGMZ_Window_FilterOption.prototype.constructor = CGMZ_Window_FilterOption;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Window_FilterOption.prototype.initialize = function(rect) {
	Window_Selectable.prototype.initialize.call(this, rect);
	this._data = [];
	this._filterType = null;
	this.refresh();
	this.setBackgroundType(2 * (CGMZ.Crafting.WindowTransparency));
	this.deactivate();
	this.hide();
};
//-----------------------------------------------------------------------------
// Add CGMZ Window Options
//-----------------------------------------------------------------------------
CGMZ_Window_FilterOption.prototype.CGMZ_createWindowOptions = function() {
	Window_Selectable.prototype.CGMZ_createWindowOptions.call(this);
	if(CGMZ.Crafting.CategoryWindowskin) this.cgmzOpts.windowskin = CGMZ.Crafting.CategoryWindowskin;
	if(CGMZ.Crafting.CategoryPadding >= 0) this.cgmzOpts.padding = CGMZ.Crafting.CategoryPadding;
	if(CGMZ.Crafting.CategoryBackOpacity >= 0) this.cgmzOpts.backOpacity = CGMZ.Crafting.CategoryBackOpacity;
	if(CGMZ.Crafting.CategoryTone?.Red >= -255) this.cgmzOpts.tone = [CGMZ.Crafting.CategoryTone.Red, CGMZ.Crafting.CategoryTone.Green, CGMZ.Crafting.CategoryTone.Blue];
};
//-----------------------------------------------------------------------------
// Max items
//-----------------------------------------------------------------------------
CGMZ_Window_FilterOption.prototype.maxItems = function() {
	return this._data ? this._data.length : 1;
};
//-----------------------------------------------------------------------------
// Current item
//-----------------------------------------------------------------------------
CGMZ_Window_FilterOption.prototype.item = function() {
	return this._data[this.index()];
};
//-----------------------------------------------------------------------------
// Refresh
//-----------------------------------------------------------------------------
CGMZ_Window_FilterOption.prototype.setFilterType = function(type) {
	this._filterType = type;
};
//-----------------------------------------------------------------------------
// Refresh
//-----------------------------------------------------------------------------
CGMZ_Window_FilterOption.prototype.refresh = function(filters) {
	this.makeItemList(filters);
	Window_Selectable.prototype.refresh.call(this);
};
//-----------------------------------------------------------------------------
// Make item list
//-----------------------------------------------------------------------------
CGMZ_Window_FilterOption.prototype.makeItemList = function(filters) {
	this._data = [];
	if(!this._filterType) return;
	if(!filters[this._filterType]) return;
	this._data = JSON.parse(JSON.stringify(filters[this._filterType]));
};
//-----------------------------------------------------------------------------
// Draw item in list
//-----------------------------------------------------------------------------
CGMZ_Window_FilterOption.prototype.drawItem = function(index) {
	const item = this._data[index];
	const rect = this.itemRectWithPadding(index);
	this.CGMZ_drawTextLine(item, rect.x, rect.y, rect.width, 'center');
};
//=============================================================================
// Game_Battler
//-----------------------------------------------------------------------------
// Use recipe item processing
//=============================================================================
//-----------------------------------------------------------------------------
// Item use may cause learning of a recipe
//-----------------------------------------------------------------------------
const alias_CGMZ_Crafting_useItem = Game_Battler.prototype.useItem;
Game_Battler.prototype.useItem = function(item) {
	alias_CGMZ_Crafting_useItem.call(this, item);
	if(DataManager.isItem(item)) $cgmz.checkItemForRecipe(item);
};
//=============================================================================
// Game_Party
//-----------------------------------------------------------------------------
// Use recipe item processing
//=============================================================================
//-----------------------------------------------------------------------------
// Item use may cause learning of a recipe
//-----------------------------------------------------------------------------
const alias_CGMZ_Crafting_GameParty_gainItem = Game_Party.prototype.gainItem;
Game_Party.prototype.gainItem = function(item, amount, includeEquip) {
	alias_CGMZ_Crafting_GameParty_gainItem.apply(this, arguments);
	if(CGMZ.Crafting.AutomaticLearn) $cgmz.checkCraftingRecipesForLearn();
};