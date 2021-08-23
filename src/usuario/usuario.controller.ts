import {
  Body,
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { NestResponse } from 'src/core/http/nest-response';
import { NestResponseBuilder } from 'src/core/http/nest-response-builder';
import { Usuario } from './usuario.entity';
import { UsuarioService } from './usuario.service';

@Controller('users')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Get(':nomeDeUsuario')
  public buscaPorNomeDeUsuario(@Param() nomeDeUsuario: any): Usuario {
    const usuarioEncontrado = this.usuarioService.buscaPorNomeDeUsuario(
      nomeDeUsuario.nomeDeUsuario,
    );

    if (!usuarioEncontrado) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Usuário não encontrado.`,
      });
    }

    return usuarioEncontrado;
  }

  @Post()
  public cria(@Body() usuario: Usuario): NestResponse {
    const usuarioCriado = this.usuarioService.cria(usuario);

    return new NestResponseBuilder()
      .withStatus(HttpStatus.CREATED)
      .withHeaders({
        Location: `/users/${usuarioCriado.nomeDeUsuario}`,
      })
      .withBody(usuarioCriado)
      .build();
  }
}
