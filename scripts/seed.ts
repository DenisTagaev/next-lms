const { PrismaClient } = require("@prisma/client");

const _db =  new PrismaClient();

(async function main() {
    try {
        await _db.category.deleteMany();
        await _db.category.createMany({
          data: [
            {
              name: "Computer Science",
            },
            {
              name: "Fitness",
            },
            {
              name: "Photography",
            },
            {
              name: "Music",
            },
            {
              name: "Accounting",
            },
            {
              name: "Medical Courses",
            },
          ]
        });
        console.log("Successfully seeded categories");
    } catch (error) {   
        console.log("Error while seeding the db categories", error);
    } finally {
        await _db.$disconnect();
    }
})();