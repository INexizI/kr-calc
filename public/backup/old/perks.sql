-- This script only contains the table creation statements and does not fully represent the table in database. It's still missing: indices, triggers. Do not use it as backup.

-- Squences
CREATE SEQUENCE IF NOT EXISTS perks_id_seq

-- Table Definition
CREATE TABLE "public"."perks" (
    "id" int8 NOT NULL DEFAULT nextval('perks_id_seq'::regclass),
    "name" varchar,
    "description" varchar,
    "image" varchar,
    "tier" varchar,
    "created_at" timestamp NOT NULL,
    "updated_at" timestamp NOT NULL,
    PRIMARY KEY ("id")
);

INSERT INTO "public"."perks" ("id", "name", "description", "image", "tier", "created_at", "updated_at") VALUES
(1, 'ATK Up', 'ATK is increased by 30%', 'ATK_Up.png', 'Generic', '2020-03-18 10:43:24.559936', '2020-03-18 10:43:24.559936');
INSERT INTO "public"."perks" ("id", "name", "description", "image", "tier", "created_at", "updated_at") VALUES
(2, 'HP Up', 'HP is increased by 30%', 'HP_Up.png', 'Generic', '2020-03-18 10:43:55.166594', '2020-03-18 10:43:55.166594');
INSERT INTO "public"."perks" ("id", "name", "description", "image", "tier", "created_at", "updated_at") VALUES
(3, 'DEF Up', 'DEF is increased by 35%', 'DEF_Up.png', 'Generic', '2020-03-18 10:44:06.713545', '2020-03-18 10:44:06.713545');
INSERT INTO "public"."perks" ("id", "name", "description", "image", "tier", "created_at", "updated_at") VALUES
(4, 'Crit Resistance Up', 'Crit Resistance increases by 250', 'Crit_Resistance_Up.png', 'Generic', '2020-03-18 10:44:20.675313', '2020-03-18 10:44:20.675313'),
(5, 'Monster Hunting', 'Increases DMG to non-hero Enemies by 10% and takes 10% reduced DMG', 'Monster_Hunting.png', 'Generic', '2020-03-18 10:44:45.156917', '2020-03-18 10:44:45.156917'),
(6, 'Expirienced Fighter', 'Increases the dmg targets take by 20%', 'Expirienced_Fighter.png', 'Knight', '2020-03-18 10:46:01.120022', '2020-03-18 10:46:01.120022'),
(7, 'Excellent Strategy', 'Increases CC ACC of all allies by 150. If the ally uses the same Perk, only 50 additional CC ACC applies', 'Excellent_Strategy.png', 'Knight', '2020-03-18 10:46:26.667739', '2020-03-18 10:46:26.667739'),
(8, 'Battle Cry', 'Increases HP of all allies by 15%. If the ally uses the same Perk, only 5% additional HP applies', 'Battle_Cry.png', 'Knight', '2020-03-18 10:46:58.307711', '2020-03-18 10:46:58.307711'),
(9, 'Shield of Protection', 'Block Rate is increased by 200 and CC resistance is increased by 200', 'Shield_of_Protection.png', 'Knight', '2020-03-18 10:47:57.938084', '2020-03-18 10:47:57.938084'),
(10, 'Swift Move', 'Increases ATK Spd by 200 and ACC by 400', 'Swift_Move.png', 'Knight', '2020-03-18 10:48:14.869138', '2020-03-18 10:48:14.869138'),
(11, 'Opportune Strike', 'Crit Chance is increased by 150 and Crit DMG is increased by 30%. Does not stack', 'Opportune_Strike.png', 'Warrior', '2020-03-18 10:49:25.210608', '2020-03-18 10:49:25.210608'),
(12, 'Warlike', 'Per each enemy, ATK is increased 7% and CC Resistance is increased by 30. Can be stacked up to max 10 times', 'Warlike.png', 'Warrior', '2020-03-18 10:49:45.403755', '2020-03-18 10:49:45.403755'),
(13, 'Offensive Guard', 'ATK rises equal to half of P.DEF and received P.DMG is decreased by 15%', 'Offensive_Guard.png', 'Warrior', '2020-03-18 10:50:21.498205', '2020-03-18 10:50:21.498205'),
(14, 'Tactical Foresight', 'Dodge rate is increased by 200 and takes 10% reduced DMG', 'Tactical_Foresight.png', 'Warrior', '2020-03-18 10:50:40.789228', '2020-03-18 10:50:40.789228'),
(15, 'Blood Wrath', 'Increases Lifesteal by 200 and ATK Spd by 200', 'Blood_Wrath.png', 'Warrior', '2020-03-18 10:51:14.714585', '2020-03-18 10:51:14.714585'),
(16, 'Target Weakness', 'ATK rises by 20% and DEF Penetration rises by 200', 'Target_Weakness.png', 'Assassin', '2020-03-18 10:55:11.710583', '2020-03-18 10:55:11.710583'),
(17, 'Swift and Nimble', 'Per every sec, Dodge rate is increased by 100. This effect can be stacked up to max 5 times, and resets upon dodging an Attack', 'Swift_and_Nimble.png', 'Assassin', '2020-03-18 10:55:34.723143', '2020-03-18 10:55:34.723143'),
(18, 'Tactical Foresight', 'Dodge rate is increased by 200 and takes 10% reduced DMG', 'Tactical_Foresight.png', 'Assassin', '2020-03-18 10:55:58.589998', '2020-03-18 10:55:58.589998'),
(19, 'Opportune Strike', 'Crit Chance is increased by 150 and Crit DMG is increased by 30%', 'Opportune_Strike.png', 'Assassin', '2020-03-18 10:56:12.306365', '2020-03-18 10:56:12.306365'),
(20, 'Vital Detection', 'Upon attack, causes the target to take 10% increased All DMG and have their ATK Spd reduced by 100 for 10 sec. This effect activates once every 3 sec', 'Vital_Detection.png', 'Assassin', '2020-03-18 10:56:41.082991', '2020-03-18 10:56:41.082991'),
(21, 'Precision Shot', 'ATK rises by 20% and ACC rises by 400', 'Precision_Shot.png', 'Archer', '2020-03-18 11:00:10.526087', '2020-03-18 11:00:10.526087'),
(22, 'Eagle Eye', 'Increases all allies DEF Penetration by 150 and ACC by 75. If the ally uses the same Perk, only 50 additional DEF Penetration and 25 additional ACC apply', 'Eagle_Eye.png', 'Archer', '2020-03-18 11:00:37.581666', '2020-03-18 11:00:37.581666'),
(23, 'Mortal Wound', 'Successful Crit Attack reduces enemy recovery rate by 50% and deal Physical continuous DMG every second equal to 20% ATK. Does not stack', 'Mortal_Wound.png', 'Archer', '2020-03-18 11:01:13.713299', '2020-03-18 11:01:13.713299'),
(24, 'Opportune Strike', 'Crit Chance is increased by 150 and Crit DMG is increased by 30%', 'Opportune_Strike.png', 'Archer', '2020-03-18 11:28:29.225168', '2020-03-18 11:28:29.225168'),
(25, 'Concentration', 'Every 5 sec, increases own Crit DMG by 4%. This effect can be stacked up to max 25 times and is irremovable', 'Concentration.png', 'Archer', '2020-03-18 11:28:52.786175', '2020-03-18 11:28:52.786175'),
(26, 'Target Weakness', 'ATK rises by 20% and DEF Penetration rises by 200', 'Target_Weakness.png', 'Mechanic', '2020-03-18 11:32:17.028402', '2020-03-18 11:32:17.028402'),
(27, 'Ready Cannons', 'Mana recovery per second rises by 62.5% per every enemy', 'Ready_Cannons.png', 'Mechanic', '2020-03-18 11:32:36.795029', '2020-03-18 11:32:36.795029'),
(28, 'Pressure Point', 'Crit chance increases by 400', 'Pressure_Point.png', 'Mechanic', '2020-03-18 11:32:53.222478', '2020-03-18 11:32:53.222478'),
(29, 'Special Bullet', 'Attacked target loses 15% of ATK and 150 of crit. Chance. Does not stack', 'Special_Bullet.png', 'Mechanic', '2020-03-18 11:33:14.751904', '2020-03-18 11:33:14.751904'),
(30, 'Amplified Gunpowder', 'Increases Crit DMG of all allies by 30%. If the ally uses the same Perk, only 10% additional Crit DMG is applied', 'Amplified_Gunpowder.png', 'Mechanic', '2020-03-18 11:33:31.774588', '2020-03-18 11:33:31.774588'),
(31, 'Deception', 'When receiving DMG, becomes immune to the next 3 hit of DMG. This effect is activated every 40 sec', 'Deception.png', 'Wizard', '2020-03-18 11:35:17.1144', '2020-03-18 11:35:17.1144'),
(32, 'Moral Rise', 'Increases ATK of all allies by 15%. If the ally uses the same Perk, only 3% additional ATK applies', 'Moral_Rise.png', 'Wizard', '2020-03-18 11:35:38.375329', '2020-03-18 11:35:38.375329'),
(33, 'Blessing of Mana', 'Mana recovery per second rises by 250%', 'Blessing_of_Mana.png', 'Wizard', '2020-03-18 11:35:53.697038', '2020-03-18 11:35:53.697038'),
(34, 'Circuit Burst', 'Receives 15% more DMG but gains 40% ATK. ACC is increases by 200', 'Circuit_Burst.png', 'Wizard', '2020-03-18 11:36:21.071447', '2020-03-18 11:36:21.071447'),
(35, 'Destruction', 'Increases Crit Chance by 200 and DEF Penetration by 200', 'Destruction.png', 'Wizard', '2020-03-18 11:36:37.16661', '2020-03-18 11:36:37.16661'),
(36, 'Vengeful Curse', 'When hit by an enemy, attacker''s DMG is reduced by 70% for 3 sec. This effect only activates once in 40 sec, and cannot be dispelled', 'Vengeful_Curse.png', 'Priest', '2020-03-18 11:38:18.625187', '2020-03-18 11:38:18.625187'),
(37, 'Goddess Blessing', 'Increases Crit Chance of all allies by 150. If the ally uses the same Perk, only 50 additional Crit Chance applies', 'Goddess_Blessing.png', 'Priest', '2020-03-18 11:38:40.629168', '2020-03-18 11:38:40.629168'),
(38, 'Inner Peace', 'Heal all allies by 1% every sec and increases CC Resist by 75. If the ally uses the same Perk, only 0.3% additional healing per sec and 25 additional CC Resist apply', 'Inner_Peace.png', 'Priest', '2020-03-18 11:38:56.965884', '2020-03-18 11:38:56.965884'),
(39, 'Blessing of Mana', 'Mana recovery per second rises by 250%', 'Blessing_of_Mana.png', 'Priest', '2020-03-18 11:39:23.829263', '2020-03-18 11:39:23.829263'),
(40, 'Swiftness', 'Increases ATK Spd of all allies by 150. If the ally uses the same Perk, only 50 additional ATK Spd applies', 'Swiftness.png', 'Priest', '2020-03-18 11:39:39.73006', '2020-03-18 11:39:39.73006');