import {
  Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards,
} from '@nestjs/common';
import { AgentsService } from './agents.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('agents')
export class AgentsController {
  constructor(private agentsService: AgentsService) {}

  @Get()
  findAll(
    @Query('featured') featured?: string,
    @Query('highlighted') highlighted?: string,
    @Query('limit') limit?: string,
  ) {
    return this.agentsService.findAll({
      featured: featured === 'true',
      highlighted: highlighted === 'true',
      limit: limit ? parseInt(limit) : 20,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.agentsService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  create(@Body() body: any) {
    return this.agentsService.create(body);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  update(@Param('id') id: string, @Body() body: any) {
    return this.agentsService.update(id, body);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  remove(@Param('id') id: string) {
    return this.agentsService.remove(id);
  }

  @Post(':id/lock')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  lock(@Param('id') id: string) {
    return this.agentsService.lock(id);
  }

  @Post(':id/unlock')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  unlock(@Param('id') id: string) {
    return this.agentsService.unlock(id);
  }

  @Post(':id/deposit')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  setDeposit(@Param('id') id: string, @Body('amount') amount: number) {
    return this.agentsService.setDeposit(id, amount);
  }

  @Post(':id/trust')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  setTrust(@Param('id') id: string, @Body() body: { score: number; source: string }) {
    return this.agentsService.setTrustScore(id, body.score, body.source);
  }
}
