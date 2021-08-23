import { Exclude, Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { IsNomeDeUsuarioUnico } from './is-nome-de-usuario-unico.validator';

export class Usuario {
  id: number;

  @Expose({
    name: 'username',
  })
  @IsNotEmpty({
    message: 'nomeDeUsuario é obrigatório.',
  })
  @IsString({
    message: 'nomeDeUsuario precisa ser do tipo texto.',
  })
  @IsNomeDeUsuarioUnico({
    message: 'nomeDeUsuario precisa ser único.',
  })
  nomeDeUsuario: string;

  @IsEmail(
    {},
    {
      message: 'email precisa ser um endereço válido.',
    },
  )
  email: string;

  @Exclude({
    toPlainOnly: true,
  })
  @Expose({
    name: 'password',
  })
  @IsNotEmpty({
    message: 'senha é obrigatório.',
  })
  senha: string;

  @Expose({
    name: 'fullName',
  })
  @IsNotEmpty({
    message: 'nomeCompleto é obrigatório.',
  })
  nomeCompleto: string;

  @Expose({
    name: 'joinDate',
  })
  dataDeEntrada: Date;
}
