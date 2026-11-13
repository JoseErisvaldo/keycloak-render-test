CREATE TABLE "Example" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Example_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "Example_ownerId_createdAt_idx" ON "Example"("ownerId", "createdAt");
