import { IMenu } from "@/components/Menu";

const PROTECTED_MENU_PREFIX = "/admin";

export const PROTECTED_MENUS: IMenu[] = [
  {
    title: "Usuários",
    subMenu: [
      {
        url: `${PROTECTED_MENU_PREFIX}/cadastroDeUsuario`,
        title: "Cadastro de Usuários",
      },
    ],
  },
  {
    title: "Relatórios",
    subMenu: [
      {
        url: `${PROTECTED_MENU_PREFIX}/report/relatorioEmprestimo`,
        title: "Relatório de Emprestimo",
      },
      {
        url: `${PROTECTED_MENU_PREFIX}/report/relatorioUsuario`,
        title: "Relatório usuário",
      },

      {
        url: `${PROTECTED_MENU_PREFIX}/report/relatorioLivro`,
        title: "Relatório de livros",
      },
    ],
  },
];
