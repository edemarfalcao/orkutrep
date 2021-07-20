import React from 'react'; 
import MainGrid from '../src/Components/MainGrid';
import Box from '../src/Components/BoxItem';
import { ProfileRelationsBoxWrapper } from '../src/Components/profileRelationsArea';
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet, } from '../src/lib/AlurakutCommons';



function ProfileSidebdar(props) {
  return (
    <Box as="aside">
    <img src= {`https://github.com/${props.githubUser}.png`} style={{borderRadius: '8px'}}/>
    <hr/> 
    <p>
    <a className ="boxLink" href={`https://github.com/${props.githubUser}`}>
      @{props.githubUser}
    </a>
    </p>
    <hr/> 
    <AlurakutProfileSidebarMenuDefault/>
    </Box>
  )
}
function ProfileRelationsBox (propriedades) {
  return (
    <ProfileRelationsBoxWrapper>
        <h2 className="smallTitle"> 
          {propriedades.title}
          ({propriedades.items.length})
        </h2>
          <ul>
            {propriedades.items.slice(0,3).map((itemAtual) => {
          return (
              <li key={itemAtual.id}>
              <a href={itemAtual.html_url} key={itemAtual.id}>
                <img src={itemAtual.avatar_url} />
                <span>{itemAtual.login}</span>
              </a>
            </li>
          )
        })}
      </ul>
        </ProfileRelationsBoxWrapper>
  )
}



export default function Home() {
  const [comunidades, setComunidades] = React.useState([{
   
  }]);
  const [depoimentos, setDepoimentos] = React.useState([{
    
  }]);
  const gitUser = 'edemarfalcao';
  // const comunidades = ['Alurakut'];
  let pessoasFavoritas = [
    'telito',
    'rafaballerini',
    'filipedeschamps',
    'peas',
    'omariosouto',
    't',
  ] 
  pessoasFavoritas = (pessoasFavoritas)

  const [seguidores, setSeguidores] = React.useState([]);

  React.useEffect(function(){ 
    fetch('https://api.github.com/users/edemarfalcao/following')
    .then(function (response){
      return response.json(); 
    })
    .then(function(fullResponse)  {
      setSeguidores(fullResponse);
    })
    
    fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: {
        'Authorization': 'ea3ddd4c619869b46921ba8f2c68bc', 
        'Content-Type' : 'application/json',
        'Accept': 'application/json',

      },
      body: JSON.stringify({ "query": `query {
        allCommunities {
          id
          title
          imageUrl            
        }
      }` })
    })
    .then((response) => response.json()) //Pega o retorno o response.json
    .then ((fullResponse) => {
      const comunidadesDato = fullResponse.data.allCommunities;
      setComunidades(comunidadesDato)
    })

    fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: {
        'Authorization': 'ea3ddd4c619869b46921ba8f2c68bc', 
        'Content-Type' : 'application/json',
        'Accept': 'application/json',

      },
      body: JSON.stringify({ "query": `query {
        allTestimonials {
          id
          message
          creatorSlug           
        }
      }` })
    })
    .then((response) => response.json()) //Pega o retorno o response.json
    .then ((fullResponse) => {
      const depoimentosDato = fullResponse.data.allTestimonials;
      setDepoimentos(depoimentosDato)
    })
    

  }, []) 

  
  

  return (
    <>
    <AlurakutMenu/>
    <MainGrid>

      <div className="profileArea" style={{ gridArea: 'profileArea'}}>
           <ProfileSidebdar githubUser={gitUser}/>
      </div>
      <div className="welcomeArea" style={{ gridArea: 'welcomeArea'}}>
        <Box>
        <h1 className="title"> Bem vindo(a)</h1>
        <OrkutNostalgicIconSet/>
        </Box>
        <Box>
          <h2 className="subTitle">Criar uma comunidade</h2>
          <form onSubmit={function handleCriarComunidade(e){
            e.preventDefault();
            const dadosDoForm = new FormData(e.target);

            const comunidade = {
              title: dadosDoForm.get('title'),
              image_url: dadosDoForm.get('image'),
              creator_slug: gitUser, 
            }

            fetch('/api/comunidades', {
              method: 'POST', 
              headers: {
                'Content-Type' : 'application/json',
              },
              body: JSON.stringify(comunidade)
            })
            .then(async(response) => {
              const dados = await response.json(); 
              const comunidade = dados.registroCriado;
              const comunidadesAtualizadas = [...comunidades, comunidade];
              setComunidades(comunidadesAtualizadas)
            })


           
 
          }} >
               <div>
                  <input  placeholder="Qual vai ser o nome da sua comunidade?"
                  name="title" 
                  aria-label="Qual vai ser o nome da sua comunidade?"
                  />

               </div>
               <div>
                  <input  placeholder="Coloque uma URL para usar de capa"
                  name="image" 
                  aria-label="Coloque uma URL para usar de capa"/>
               </div>

               <button>
                 Criar comunidade
               </button>
            
            </form>
        </Box>
        <Box>
          <h2 className="subTitle">Depoimento:</h2>
          <form onSubmit={function handleCriarDepoimento(e){
            e.preventDefault();
            const dadosDoFor = new FormData(e.target);

            const depoimento = {
              message: dadosDoFor.get('message'),
              creator_slug: gitUser, 
              user: dadosDoFor.get('user'),
            }

            fetch('/api/depoimentos', {
              method: 'POST', 
              headers: {
                'Content-Type' : 'application/json',
              },
              body: JSON.stringify(depoimento)
            })
            .then(async(response) => {
              const dados = await response.json(); 
              const depoimento = dados.registro_criado;
              const depoimentosAtualizados = [...depoimentos, depoimento];
              setDepoimentos(depoimentosAtualizados)
            })


           
 
          }} >
               <div>
                  <input  placeholder="Seu usuario do GitHub"
                  name="user" 
                  aria-label="Seu usuario do GitHub"
                  />

               </div>
               <div>
                  <input  placeholder="Deixe sua mensagem"
                  name="message" 
                  aria-label="Deixe sua mensagem"/>
               </div>

               <button>
                 Publicar
               </button>
            
            </form>
        </Box>

        <Box>
        <h2 className="subTitle">Depoimentos({depoimentos.length})</h2>
          <ul>
            {depoimentos.slice(0,6).map((itemF)=>{
              return (
               <li key={itemF.id} >
                  <a href={`/users/${itemF.id}`} key={itemF.id}>
                    <img src={itemF.creator_slug} /> 
                    <p>{itemF.message}</p>
                    <p>{itemF.creatorSlug}</p>
                 </a>
                </li>
              )
            })}
          </ul>

        </Box>

      </div>
      <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea'}}>
      
        <ProfileRelationsBoxWrapper>
        <h2 className="smallTitle">Comunidades({comunidades.length})</h2>
          <ul>
            {comunidades.slice(0,6).map((itemF)=>{
              return (
               <li key={itemF.id} >
                  <a href={`/users/${itemF.id}`} key={itemF.id}>
                    <img src={itemF.imageUrl} /> 
                    <span>{itemF.title}</span>
                 </a>
                </li>
              
              )
            
            })}
          </ul>
        </ProfileRelationsBoxWrapper>
        <ProfileRelationsBox title="Seguindo" items={seguidores} />
        <ProfileRelationsBoxWrapper>
          <h2 className="smallTitle">Pessoas da comunidade({pessoasFavoritas.length})</h2>
          <ul>
            {pessoasFavoritas.slice(0,3).map((itemF) =>{
            return (
              <li key={itemF}>
                <a href={`/users/${itemF}`} key={itemF}>
                <img src={`https://github.com/${itemF}.png`} />
                <span>{itemF}</span>
                 </a>
              </li>
              
              )
            
            })}
          </ul>
        </ProfileRelationsBoxWrapper>
         
        
        </div>
     
    </MainGrid>
    </>
  )
}
