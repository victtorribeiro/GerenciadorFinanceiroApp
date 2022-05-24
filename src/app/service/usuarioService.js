import ApiService from "../apiService";
import ErroValidacao from "../exception/ErroValidacao"

class UsuarioService extends ApiService{

    constructor(){
        super('/api/usuarios')
    }

    autenticar(credenciais){
        return this.post('/autenticar', credenciais);
    }

    obterSaldoPorUsuario(id){
        return this.get(`/saldo/${id}`);
    }

    salvar(usuario){
        return this.post('/salvar', usuario);
    }

    validar(usuario){
        const erros = [];

        if(!usuario.nome){
            erros.push('O campo nome é obrigatório.');
        }
        if(!usuario.email){
            erros.push('O campo email é obrigatório.')
        } else if( !usuario.email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/) ){
            erros.push('Informe um email válido.')
        }
        if(!usuario.senha || !usuario.senhaRepeticao){
            erros.push('Digite a senha 2x.')
        } else if(usuario.senha !== usuario.senhaRepeticao){
            erros.push('As senhas não são iguais.')
        }

        if( erros && erros.length > 0 ) {
            throw new ErroValidacao(erros);
        }
    }
}

export default UsuarioService;