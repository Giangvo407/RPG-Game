const Character = require('../models/character');
const Monster = require('../models/monster');
const express = require('express');
const router = express.Router();



router.post('/', async (req, res) => {
    try {
        const characterId = req.body.characterId;
        const character = await Character.findById(characterId).populate('inventory');
        if (!character) {
            return res.status(404).send('Character not found');
        }

        const rarityWeights = {
            Common: 50,
            Uncommon: 30,
            Rare: 15,
            Epic: 4,
            Legendary: 1
        };

        const totalWeight = Object.values(rarityWeights).reduce((acc, val) => acc + val, 0);
        let randomNumber = Math.floor(Math.random() * totalWeight);
        let selectedRarity;
        for (const [rarity, weight] of Object.entries(rarityWeights)) {
            if (randomNumber < weight) {
                selectedRarity = rarity;
                break;
            }
            randomNumber -= weight;
        }

        const monster = await Monster.findOne({ rarity: selectedRarity });
        if (!monster) {
            return res.status(404).send('Monster not found');
        }
        const battleLog = [];
        const typeInventory = character.inventory.map((inventory) => inventory.type);
        res.render('./characters/battle', { character, monster, typeInventory, battleLog });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/attack', async (req, res) => {
    try {
        const { characterId, monsterId } = req.body;

        let battleLog = [];

        const character = await Character.findById(characterId);
        const monster = await Monster.findById(monsterId);
        const typeInventory = character.inventory.map((inventory) => {
            return inventory.type
        });

        if (character.minHitPoints <= 0) {
            battleLog.push('You cannot attack when you are defeated!');
            return res.render('./characters/battle', { character, monster: null, battleLog, typeInventory });
        }

        const originalMonsterHitPoints = monster.hitPoints;

        const characterDamage = Math.floor(Math.random() * character.strength) + 1;
        monster.hitPoints -= characterDamage;

        battleLog.push(`You attacked ${monster.name} and dealt ${characterDamage} damage.`);

        if (monster.hitPoints <= 0) {
            character.exp += monster.exp;
            if (monster.loot) {
                character.inventory.push(monster.loot);
            }
            if (monster.gold) {
                character.gold += monster.gold;
            }

            battleLog.push(`You defeated ${monster.name}!`);

            monster.hitPoints = originalMonsterHitPoints;

            await character.save();
            await monster.save();

            res.render('./characters/battle', { character, monster: null, battleLog, typeInventory });
        } else {
            const monsterDamage = Math.floor(Math.random() * monster.strength) + 1;
            character.minHitPoints -= monsterDamage;
            battleLog.push(`${monster.name} retaliated and dealt ${monsterDamage} damage.`);

            if (character.minHitPoints <= 0) {
                character.gold = Math.floor(character.gold * 0.5);
                await character.save();
                
                battleLog.push('You were defeated by the monster!');

                res.render('./characters/battle', { character, monster: null, battleLog, typeInventory });
            } else {
                await character.save();
                res.render('./characters/battle', { character, monster, battleLog, typeInventory }); 
            }
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/heal', async (req, res) => {
    try {
        const { characterId, healingPower } = req.body;
        const character = await Character.findById(characterId);
        const currentMonster = await Monster.findById(monsterId);

        let newHitPoints = character.minHitPoints +(healingPower);
        
        if (newHitPoints > character.maxHitPoints) {
            newHitPoints = character.maxHitPoints;
        }
        character.minHitPoints = newHitPoints;
        await character.save();

        const typeInventory = character.inventory.map((inventory) => {
            return inventory.type
        })
        battleLog.push(`Character used ${potion.name} (Heal ${potion.healingPower} HP)!`);
        
        res.render('./characters/battle', {character, monster: currentMonster, typeInventory}); 
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

// POST route for fleeing
router.post('/flee', async (req, res) => {
    try {
        res.redirect('/characters');
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;