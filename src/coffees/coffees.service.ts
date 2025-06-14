import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';

@Injectable()
export class CoffeesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    const coffees = await this.prisma.coffee.findMany({
      include: {
        tags: {
          include: {
            tag: true,
          },
        },
      },
    });

    return coffees.map(coffee => ({
      ...coffee,
      tags: coffee.tags.map(coffeeTag => coffeeTag.tag),
    }));
  }

  async findOne(id: string) {
    const coffee = await this.prisma.coffee.findUnique({
      where: { id },
      include: {
        tags: {
          include: {
            tag: true,
          },
        },
      },
    });

    if (!coffee) {
      throw new NotFoundException(`Coffee with ID ${id} not found`);
    }

    return {
      ...coffee,
      tags: coffee.tags.map(coffeeTag => coffeeTag.tag),
    };
  }

  async create(createCoffeeDto: CreateCoffeeDto) {
    // código aqui

    // return this.prisma.coffee.create({data: {}});
  }

  async update(coffeeId: string, updateCoffeeDto: UpdateCoffeeDto) {
    const coffee = await this.prisma.cartItem.findFirst({
      where: {
        id: coffeeId
      },
    });

    if (!coffee) {
      throw new NotFoundException(`Coffee with ID ${coffeeId} not found}`);
    }

    return this.prisma.coffee.update({
      where: { id },
      data: [], // seu dados atualziados iserir aqui
      include: {
        tags: {
          include: {
            tag: true,
          },
        },
      },
    });
  }

  async remove(coffeeId: string) {
    const coffee = await this.prisma.cartItem.findFirst({
      where: {
        id: coffeeId
      },
    });

    if (!coffee) {
      throw new NotFoundException(`Coffee with ID ${coffeeId} not found}`);
    }

    await this.prisma.cart.removeItem(coffee)

    return { success: true };
  }

  async searchCoffees(params: {
    start_date?: Date;
    end_date?: Date;
    name?: string;
    tags?: string[];
    limit?: number;
    offset?: number;
  }) {
    const { start_date, end_date, name, tags, limit = 10, offset = 0 } = params;

    const coffees = await this.prisma.coffee.filter({
      where: {
        name: name,
        tags: tags,
        createAt: start_date
       }

    });

    if (!coffees) {
      throw new NotFoundException(`Coffee with name ${name} not found`);
    }

    // continue com sua lógica aqui!
    return {
      data: [],
      pagination: {
        total: [],
        limit,
        offset,
        hasMore: offset,
      },
    };
  }
} 