import { useNavigate  } from "react-router-dom";
import { MdEmail, MdLock, MdPerson } from 'react-icons/md'
import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import { api } from '../../services/api';

import { useForm } from "react-hook-form";


import { Container, Title, Column, TitleRegister, SubtitleRegister, LoginText, Row, Wrapper, AvisoText, LoginWrapper, LoginLink } from './styles';

const Register = () => {

    const navigate = useNavigate()

    const handleClickLogin = () => {
        navigate('/login')
    }

    const { control, handleSubmit, formState: { errors  } } = useForm({
        reValidateMode: 'onChange',
        mode: 'onChange',
    });

    const onSubmit = async (formData) => {
        try{
            const {data} = await api.postForm(`/users`, formData);
            
            if(data && data.id){
                navigate('/feed') 
                return
            }

            alert('Usuário ou senha inválido')
        }catch(e){
            //TODO: HOUVE UM ERRO
        }
    };

    console.log('errors', errors);

    return (<>
        <Header />
        <Container>
            <Column>
                <Title>A plataforma para você aprender com experts, dominar as principais tecnologias
                 e entrar mais rápido nas empresas mais desejadas.</Title>
            </Column>
            <Column>
                <Wrapper>
                <TitleRegister>Começe agora grátis</TitleRegister>
                <SubtitleRegister>Crie sua conta e make the change._</SubtitleRegister>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Input placeholder="Nome Completo" leftIcon={<MdPerson />} name="nome"  control={control} />
                    {errors.nome && <span>Nome é obrigatório</span>}                    
                    <Input placeholder="E-mail" leftIcon={<MdEmail />} name="email"  control={control} />
                    {errors.email && <span>E-mail é obrigatório</span>}
                    <Input type="password" placeholder="Senha" leftIcon={<MdLock />}  name="senha" control={control} />
                    {errors.senha && <span>Senha é obrigatório</span>}
                    <Button title="Criar minha conta" variant="secondary" type="submit"/>
                </form>
                <Row>
                    <AvisoText>Ao clicar em "criar minha conta grátis", declaro que aceito as Políticas de Privacidade e os Termos de Uso da DIO.</AvisoText>                    
                </Row>
                <Row>
                    <LoginWrapper >
                        <LoginText>Já tenho conta.</LoginText>
                        <LoginLink onClick={handleClickLogin}>Fazer Login</LoginLink>
                    </LoginWrapper>                    
                </Row>
                </Wrapper>
            </Column>
        </Container>
    </>)
}

export { Register }