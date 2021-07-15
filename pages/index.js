
import React from 'react'; 
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box/'
import { ProfileRelationsBoxWrapper } from '../src/components/profileRelationsArea';
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

function shuffleArray(arr) {
  // Loop em todos os elementos
for (let i = arr.length - 1; i > 0; i--) {
      // Escolhendo elemento aleatório
  const j = Math.floor(Math.random() * (i + 1));
  // Reposicionando elemento
  [arr[i], arr[j]] = [arr[j], arr[i]];
}
// Retornando array com aleatoriedade
return arr;
}

export default function Home() {
  const [comunidades, setComunidades] = React.useState([{
    id:'88748156',
    title: 'V.A.S.P',
    image: 'https://img10.orkut.br.com/community/18538602725e6b77a353bd40.62088362_03a7dd1e044e00c4b820e8de39448d68.jpg'
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
  pessoasFavoritas = shuffleArray(pessoasFavoritas)

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
          <h2 className="subTitle">O que você deseja fazer?</h2>
          <form onSubmit={function handleCriarComunidade(e){
            e.preventDefault();
            const dadosDoForm = new FormData(e.target);

            const comunidade = {
              id: new Date().toISOString(),
              title: dadosDoForm.get('title'),
              image: dadosDoForm.get('image'),
            }
            const comunidadesAtualizadas = [...comunidades, comunidade]
            setComunidades(comunidadesAtualizadas );
            console.log(comunidades);
 
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
      </div>
      <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea'}}>
        <ProfileRelationsBoxWrapper>
        <h2 className="smallTitle">Comunidades({comunidades.length})</h2>
          <ul>
            {comunidades.slice(0,6).map((itemF)=>{
              return (
               <li key={itemF.id} >
                  <a href={`/users/${itemF.title}`} key={itemF.title}>
                    <img src={itemF.image} /> 
                    <span>{itemF.title}</span>
                 </a>
                </li>
              
              )
            
            })}
          </ul>
        </ProfileRelationsBoxWrapper>
        
        <ProfileRelationsBoxWrapper>
          <h2 className="smallTitle">Pessoas da comunidade({pessoasFavoritas.length})</h2>
          <ul>
            {pessoasFavoritas.slice(0,6).map((itemF) =>{
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
