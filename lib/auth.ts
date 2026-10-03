import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export async function comparePasswords(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

export async function getUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email },
  });
}

export async function createUser(email: string, password: string, name?: string) {
  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await hashPassword(password);

  return prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
    },
  });
}

export async function getUserPreferences(userId: string) {
  const prefs = await prisma.userPreference.findUnique({
    where: { userId },
  });
  return prefs?.tags || ["fantasy", "cozy", "supportive", "mystic"];
}

export async function setUserPreferences(userId: string, tags: string[]) {
  const deduped = Array.from(new Set(tags.map((t) => t.toLowerCase())));
  return prisma.userPreference.upsert({
    where: { userId },
    update: { tags: deduped },
    create: { userId, tags: deduped },
  });
}

export async function getUserFavorites(userId: string) {
  const favorites = await prisma.savedCharacter.findMany({
    where: { userId },
    include: { character: true },
  });
  return favorites.map((f) => f.character);
}

export async function toggleUserFavorite(userId: string, characterId: string) {
  const existing = await prisma.savedCharacter.findUnique({
    where: { userId_characterId: { userId, characterId } },
  });

  if (existing) {
    await prisma.savedCharacter.delete({
      where: { userId_characterId: { userId, characterId } },
    });
    return false;
  } else {
    await prisma.savedCharacter.create({
      data: { userId, characterId },
    });
    return true;
  }
}

export async function isCharacterFavorited(
  userId: string,
  characterId: string
): Promise<boolean> {
  const fav = await prisma.savedCharacter.findUnique({
    where: { userId_characterId: { userId, characterId } },
  });
  return !!fav;
}
