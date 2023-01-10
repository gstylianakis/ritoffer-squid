module.exports = class Data1673381353989 {
    name = 'Data1673381353989'

    async up(db) {
        await db.query(`ALTER TABLE "token" ADD "is_available" boolean`)
        await db.query(`ALTER TABLE "token" ADD "is_listed" boolean`)
        await db.query(`ALTER TABLE "token" ADD "price" numeric`)
    }

    async down(db) {
        await db.query(`ALTER TABLE "token" DROP COLUMN "is_available"`)
        await db.query(`ALTER TABLE "token" DROP COLUMN "is_listed"`)
        await db.query(`ALTER TABLE "token" DROP COLUMN "price"`)
    }
}
