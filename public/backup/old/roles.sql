-- This script only contains the table creation statements and does not fully represent the table in database. It's still missing: indices, triggers. Do not use it as backup.

-- Squences
CREATE SEQUENCE IF NOT EXISTS roles_id_seq

-- Table Definition
CREATE TABLE "public"."roles" (
    "id" int8 NOT NULL DEFAULT nextval('roles_id_seq'::regclass),
    "name" varchar,
    "image" varchar,
    "created_at" timestamp NOT NULL,
    "updated_at" timestamp NOT NULL,
    "slug" varchar,
    PRIMARY KEY ("id")
);

INSERT INTO "public"."roles" ("id", "name", "image", "created_at", "updated_at", "slug") VALUES
(1, 'Knight', 'knight.png', '2020-03-18 10:29:19.626657', '2020-03-18 10:29:19.626657', 'knight');
INSERT INTO "public"."roles" ("id", "name", "image", "created_at", "updated_at", "slug") VALUES
(2, 'Warrior', 'warrior.png', '2020-03-18 10:33:10.056021', '2020-03-18 10:33:10.056021', 'warrior');
INSERT INTO "public"."roles" ("id", "name", "image", "created_at", "updated_at", "slug") VALUES
(3, 'Assassin', 'assassin.png', '2020-03-18 10:33:25.232527', '2020-03-18 10:33:25.232527', 'assassin');
INSERT INTO "public"."roles" ("id", "name", "image", "created_at", "updated_at", "slug") VALUES
(4, 'Archer', 'archer.png', '2020-03-18 10:33:37.082729', '2020-03-18 10:33:37.082729', 'archer'),
(5, 'Mechanic', 'mechanic.png', '2020-03-18 10:33:52.111283', '2020-03-18 10:33:52.111283', 'mechanic'),
(6, 'Wizard', 'wizard.png', '2020-03-18 10:34:12.307808', '2020-03-18 10:34:12.307808', 'wizard'),
(7, 'Priest', 'priest.png', '2020-03-18 10:34:26.453236', '2020-03-18 10:34:26.453236', 'priest');