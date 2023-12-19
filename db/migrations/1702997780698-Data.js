module.exports = class Data1702997780698 {
    name = 'Data1702997780698'

    async up(db) {
        await db.query(`CREATE TABLE "inscription" ("id" character varying NOT NULL, "block" integer NOT NULL, "creator" text NOT NULL, "data" text NOT NULL, "is_esip6" boolean NOT NULL, CONSTRAINT "PK_e3ec336b4b1fd26e2370893d24b" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_3e8a6888fc55b3e0953dd4c76f" ON "inscription" ("creator") `)
    }

    async down(db) {
        await db.query(`DROP TABLE "inscription"`)
        await db.query(`DROP INDEX "public"."IDX_3e8a6888fc55b3e0953dd4c76f"`)
    }
}
