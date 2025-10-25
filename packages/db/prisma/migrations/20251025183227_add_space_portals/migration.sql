-- CreateTable
CREATE TABLE "space_portals" (
    "id" SERIAL NOT NULL,
    "map_id" INTEGER NOT NULL,
    "space_id" INTEGER NOT NULL,
    "x" INTEGER NOT NULL,
    "y" INTEGER NOT NULL,
    "width" INTEGER NOT NULL DEFAULT 2,
    "height" INTEGER NOT NULL DEFAULT 2,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "space_portals_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "space_portals" ADD CONSTRAINT "space_portals_map_id_fkey" FOREIGN KEY ("map_id") REFERENCES "maps"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "space_portals" ADD CONSTRAINT "space_portals_space_id_fkey" FOREIGN KEY ("space_id") REFERENCES "spaces"("id") ON DELETE CASCADE ON UPDATE CASCADE;
