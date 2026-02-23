import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { ToolsService } from './tools.service';
import { Tool } from './tool.entity';

@Controller('tools')
export class ToolsController {
  constructor(private readonly service: ToolsService) {}

  @Get() findAll() { return this.service.findAll(); }
  @Get('admin') findAllAdmin() { return this.service.findAllAdmin(); }
  @Get(':id') findOne(@Param('id', ParseIntPipe) id: number) { return this.service.findOne(id); }
  @Post() create(@Body() dto: Partial<Tool>) { return this.service.create(dto); }
  @Put(':id') update(@Param('id', ParseIntPipe) id: number, @Body() dto: Partial<Tool>) { return this.service.update(id, dto); }
  @Delete(':id') remove(@Param('id', ParseIntPipe) id: number) { return this.service.remove(id); }
}
