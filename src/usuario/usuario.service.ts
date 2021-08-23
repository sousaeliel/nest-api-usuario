import { Injectable } from '@nestjs/common';
import { Usuario } from './usuario.entity';

@Injectable()
export class UsuarioService {
  private usuarios: Array<Usuario> = [];

  public buscaPorNomeDeUsuario(nomeDeUsuario: string) {
    return this.usuarios.find(
      (usuario) => usuario.nomeDeUsuario == nomeDeUsuario,
    );
  }

  public cria(usuario: Usuario): Usuario {
    this.usuarios.push(usuario);
    return usuario;
  }
}
