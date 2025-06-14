import { Controller, Get, Post, Body, Param, HttpStatus, HttpCode, Query } from '@nestjs/common';
import { CartService } from './cart.service';
import { AddItemDto } from './dto/add-item.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createCart() {
    return this.cartService.getOrCreateCart();
  }

  @Get(':id')
  async getCart(@Param('id') id: string) {
    return this.cartService.getCart(id);
  }

  @Post(':id/items')
  @HttpCode(HttpStatus.CREATED)
  async addItem(@Param('id') id: string, @Body() addItemDto: AddItemDto) {
    return this.cartService.addItem(id, addItemDto);
  }
} 