import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AddItemDto } from './dto/add-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}

  async getOrCreateCart(userId?: string) {
    // Se userId for fornecido, buscar carrinho existente ou criar novo
    if (userId) {
      const existingCart = await this.prisma.cart.findFirst({
        where: { userId },
        include: { items: true },
      });

      if (existingCart) {
        return existingCart;
      }
    }

    // Criar novo carrinho
    return this.prisma.cart.create({
      data: {
        userId: userId || null,
      },
    });
  }

  async getCart(cartId: string) {
    // implementar sua lógica aqui
    const existingCart = await this.prisma.cart.findFirst({
      where: { cartId },
    });
    return existingCart
  }

  async addItem(cartId: string, addItemDto: AddItemDto) {
    const { coffeeId, quantity } = addItemDto;

    // Verificar se o café existe
    const coffee = await this.prisma.coffee.findUnique({
      where: { id: coffeeId },
    });

    if (!coffee) {
      throw new NotFoundException(`Coffee with ID ${coffeeId} not found`);
    }

    // continue com sua lógica aqui!
    await this.prisma.cart.addItem(coffee)
  }

  async updateItem(cartId: string, itemId: string, updateItemDto: UpdateItemDto) {
    // Verificar se o item existe no carrinho
    const item = await this.prisma.cartItem.findFirst({
      where: {
        id: itemId,
        cartId,
      },
    });

    if (!item) {
      throw new NotFoundException(`Item with ID ${itemId} not found in cart ${cartId}`);
    }

    // continue com sua lógica ou refaça
    await this.prisma.cart.updateItem(item)
  }

  async removeItem(cartId: string, itemId: string) {
    const item = await this.prisma.cartItem.findFirst({
      where: {
        id: itemId,
        cartId,
      },
    });

    if (!item) {
      throw new NotFoundException(`Item with ID ${itemId} not found in cart ${cartId}`);
    }

    await this.prisma.cart.removeItem(item)

    return { success: true };
  }

  async findItem(name:string, createAt: Date, tags: []) {

    const coffees = await this.prisma.coffee.filter({
      where: {
        name: name,
        tags: tags,
        createAt: createAt
       }

    });

    if (!coffees) {
      throw new NotFoundException(`Coffee with name ${name} not found`);
    }

    // continue com sua lógica aqui!
    return coffees
  }
} 