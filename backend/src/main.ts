import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);

  // โค้ดสำหรับการสร้างโพสต์ใหม่
  async function createPost() {
    const newPost = await prisma.post.create({
      data: {
        title: 'My First Post',
        content: 'This is the content of my first post',
        author: {
          connect: { id: 1 }, // เชื่อมโยงกับผู้ใช้ที่มี id = 1
        },
      },
    });

    console.log('Created new post:', newPost);
  }

  createPost()
    .catch((e) => {
      throw e;
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}
bootstrap();
