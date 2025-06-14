import { Controller, Get, Post, Body, Param, HttpStatus, HttpCode, Query } from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { Coffee } from './entities/coffee.entity';

@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeesService: CoffeesService) {}

  @Get()
  async findAll() {
    return this.coffeesService.findAll();
  }

  @Get('search')
  async search(
    @Query('start_date') start_date?: string,
    @Query('end_date') end_date?: string,
    @Query('name') name?: string,
    @Query('tags') tags?: string,
    @Query('limit') limit = 10,
    @Query('offset') offset = 0,
  ) {
    const tagsList = tags ? tags.split(',') : [];
    
    return this.coffeesService.searchCoffees({
      start_date: start_date ? new Date(start_date) : undefined,
      end_date: end_date ? new Date(end_date) : undefined,
      name,
      tags: tagsList,
      limit: +limit,
      offset: +offset,
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.coffeesService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createCoffeeDto: CreateCoffeeDto) {
    return this.coffeesService.create(createCoffeeDto);
  }

  @Get('filter')
  async searchCoffees(@Param() coffee: Coffee) {
    return this.coffeesService.searchCoffees(coffee);

  @Delete('delete')
    async remove(@Query(cartId) cartId: string, @Query(itemId) itemId: string) {
      return this.coffeesService.remove(cartId, itemId);
    }

  @Patch('update')
    async update(@Query(cartId) cartId: string, @Query(itemId) itemId: string) {
      return this.coffeesService.update(cartId, itemId);
    }

  // adicionar outro endpoints
} 