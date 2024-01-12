import React from "react";
import styles from "./home.module.css";

export const HomePage = () => {
  return (
    <div className={styles.containerPrincipal}>
      <div className={styles.content}>
        <div className={styles.cardImg}>
          <div></div>
          <div className={styles.contentImg}>
            <div className={styles.icons}>
              <a href="https://www.linkedin.com/in/srhgeorgia/" target="_blank">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/LinkedIn_icon.svg/240px-LinkedIn_icon.svg.png"
                  alt=""
                  className={styles.iconLinkedin}
                />
              </a>

              <a href="https://github.com/srhgeorgia" target="_blank">
                <img
                  src="https://seeklogo.com/images/G/github-logo-2E3852456C-seeklogo.com.png"
                  alt=""
                  className={styles.iconGithub}
                />
              </a>
            </div>
            <img
              src="/src/assets/spiderGirl.jpg"
              alt=""
              className={styles.imagem}
            />
          </div>
        </div>

        <div className={styles.contentString}>
          <div className={styles.cardString}>
            <div className={styles.contentTitle}>
              <h1 className={styles.title}>🎮 Como Jogar?</h1>
            </div>
            <div className={styles.contentDescription}>
              <p className={styles.description}>
                Este é um jogo de batalha de heróis, onde o vencedor é
                determinado pelo maior poder, considerando todas as
                características. Simplesmente selecione um herói ao clicar em
                "Escolher Campeão" (os detalhes podem ser visualizados ao passar
                o mouse sobre o card), e em seguida escolha o segundo herói ao
                clicar no mesmo botão no respectivo card. Um modal será aberto
                para exibir o vencedor. Para escolher outro campeão, basta
                clicar em outro card.
              </p>
              <p className={styles.description}>
                Neste projeto, a API do SuperHero foi empregada para a busca de
                heróis. Do ponto de vista técnico, foram utilizados ReactJS,
                TypeScript, Styled-Components e Axios. O React-Router-Dom foi
                empregado para facilitar a navegação entre as páginas, enquanto
                módulos de CSS foram adotados para estilização e estudos. Uma
                estrutura de pastas foi implementada para uma organização mais
                eficiente. Boa batalha!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
