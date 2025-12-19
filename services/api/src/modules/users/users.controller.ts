import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Post,
    Put,
    UseGuards,
} from "@nestjs/common";

import { Roles } from "../../common/decorators/roles.decorator";
import { AuthGuard } from "../../common/guards/auth.guard";
import { RolesGuard } from "../../common/guards/roles.guard";
import { UsersService } from "./users.service";

@Controller("users")
@UseGuards(AuthGuard, RolesGuard)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @Roles("admin")
  async findAll() {
    const users = await this.usersService.findAll();
    return {
      success: true,
      data: users,
    };
  }

  @Get(":id")
  @Roles("admin")
  async findById(@Param("id") id: string) {
    const user = await this.usersService.findById(id);
    return {
      success: true,
      data: user,
    };
  }

  @Post()
  @Roles("admin")
  async create(
    @Body()
    body: {
      email: string;
      password: string;
      name: string;
      role?: "admin" | "teacher" | "parent" | "student";
    }
  ) {
    const user = await this.usersService.create(body);
    return {
      success: true,
      data: user,
    };
  }

  @Put(":id")
  @Roles("admin")
  async update(
    @Param("id") id: string,
    @Body()
    body: Partial<{
      email: string;
      name: string;
      role: "admin" | "teacher" | "parent" | "student";
    }>
  ) {
    const user = await this.usersService.update(id, body);
    return {
      success: true,
      data: user,
    };
  }

  @Delete(":id")
  @Roles("admin")
  @HttpCode(HttpStatus.OK)
  async delete(@Param("id") id: string) {
    await this.usersService.delete(id);
    return {
      success: true,
      data: null,
    };
  }
}
