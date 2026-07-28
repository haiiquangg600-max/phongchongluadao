import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('transactions')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
export class TransactionsController {
  constructor(private transactionsService: TransactionsService) {}

  @Get('agent/:agentId')
  findByAgent(@Param('agentId') agentId: string) {
    return this.transactionsService.findByAgent(agentId);
  }

  @Post()
  create(@Body() body: any) {
    return this.transactionsService.create(body);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.transactionsService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transactionsService.remove(id);
  }
}
