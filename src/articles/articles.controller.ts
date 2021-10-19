import {
  Controller,
  Get,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
  Post,
} from "@nestjs/common";
import { ArticlesService } from "./articles.service";
import { CreateArticleDto } from "./dto/create-article.dto";
import { UpdateArticleDto } from "./dto/update-article.dto";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { RolesGuard } from "src/auth/guards/roles.guard";

@Controller({ path: "articles", version: "1" })
@UseGuards(JwtAuthGuard, RolesGuard)
export class ArticlesController {
  constructor(private readonly postsService: ArticlesService) {}

  @Post()
  create(@Body() createArticleDto: CreateArticleDto) {
    return this.postsService.create(createArticleDto);
  }

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: number) {
    return this.postsService.findOne(id);
  }

  @Put(":id")
  update(@Param("id") id: number, @Body() updateArticleDto: UpdateArticleDto) {
    return this.postsService.update(id, updateArticleDto);
  }

  @Delete(":id")
  remove(@Param("id") id: number) {
    return this.postsService.remove(id);
  }
}