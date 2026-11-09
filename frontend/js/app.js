const API_BASE = 'http://localhost:3000'; // troque pela URL do Render

const form = document.getElementById('form');
const lista = document.getElementById('lista');
const msg = document.getElementById('msg');

// Texto amigável de cada status na listagem (a API guarda a chave em inglês/snake_case)
const STATUS_LABEL = {
  agendado: 'Agendado',
  em_andamento: 'Em andamento',
  concluido: 'Concluído',
  cancelado: 'Cancelado',
};

/**
 * O que: formata a data para exibição no padrão brasileiro.
 * Como: separa "YYYY-MM-DD" em ano, mês e dia e remonta como "DD/MM/YYYY".
 * Por quê: a API e o input type="date" usam ISO; na tela fica mais legível para o aluno/usuário.
 */
function formatarData(data) {
  const [ano, mes, dia] = data.split('-');
  return `${dia}/${mes}/${ano}`;
}

/**
 * O que: valida se a string de data é uma data de calendário válida.
 * Como: exige 3 partes (ano-mês-dia), converte para número, checa faixas e
 *        confirma com Date se o dia existe de verdade (ex.: 31/02 falha).
 * Por quê: evita enviar lixo para a API e ensina validação no front antes do fetch.
 */
function dataValida(data) {
  const partes = data.split('-');
  if (partes.length !== 3) return false;

  const ano = Number(partes[0]);
  const mes = Number(partes[1]);
  const dia = Number(partes[2]);

  if (!ano || !mes || !dia) return false;
  if (mes < 1 || mes > 12) return false;
  if (dia < 1 || dia > 31) return false;
  if (ano < 1950 || ano > 2050) return false;

  // confere se a data existe de verdade (ex.: 31/02 é inválido)
  const d = new Date(ano, mes - 1, dia);
  return (
    d.getFullYear() === ano && d.getMonth() === mes - 1 && d.getDate() === dia
  );
}

/**
 * O que: busca os eventos na API e desenha a lista na página.
 * Como: faz GET /eventos, limpa a ul, cria um li por evento (com bolinha, editar e excluir).
 * Por quê: é o ponto único que atualiza a tela depois de carregar, salvar ou apagar.
 */
async function carregar() {
  const res = await fetch(`${API_BASE}/eventos`);
  const eventos = await res.json();

  lista.innerHTML = '';

  if (!eventos.length) {
    lista.innerHTML = '<li>Nenhum evento ainda.</li>';
    return;
  }

  for (const e of eventos) {
    const li = document.createElement('li');
    li.innerHTML = `
      <strong>${e.titulo}</strong>
      <p>
        ${formatarData(e.data)} - ${e.local} -
        <span class="bolinha ${e.status}"></span> ${STATUS_LABEL[e.status] || e.status}
      </p>
      <button type="button" class="editar">Editar</button>
      <button type="button" class="excluir">Excluir</button>
    `;

    /**
     * O que: coloca o evento escolhido no formulário para edição.
     * Como: copia id, título, data, local e status para os campos do form.
     * Por quê: o submit usa o id escondido para decidir entre POST (novo) e PUT (editar).
     */
    li.querySelector('.editar').onclick = () => {
      form.eventoId.value = e.id;
      form.titulo.value = e.titulo;
      form.data.value = e.data;
      form.local.value = e.local;
      form.status.value = e.status;
    };

    /**
     * O que: remove o evento na API e atualiza a lista.
     * Como: pede confirmação, chama DELETE /eventos/:id e depois carregar().
     * Por quê: o usuário precisa conseguir apagar sem recarregar a página manualmente.
     */
    li.querySelector('.excluir').onclick = async () => {
      if (!confirm('Excluir este evento?')) return;
      await fetch(`${API_BASE}/eventos/${e.id}`, { method: 'DELETE' });
      carregar();
    };

    lista.appendChild(li);
  }
}

/**
 * O que: trata o envio do formulário (criar ou atualizar evento).
 * Como: impede reload da página, valida a data, monta o JSON e chama POST ou PUT.
 * Por quê: é a ponte entre o formulário HTML e a API; sem preventDefault a página recarregaria.
 */
form.onsubmit = async (ev) => {
  ev.preventDefault();
  msg.textContent = '';

  const corpo = {
    titulo: form.titulo.value,
    data: form.data.value,
    local: form.local.value,
    status: form.status.value,
  };

  if (!dataValida(corpo.data)) {
    msg.textContent = 'Data inválida';
    return;
  }

  const id = form.eventoId.value;
  const url = id ? `${API_BASE}/eventos/${id}` : `${API_BASE}/eventos`;
  const method = id ? 'PUT' : 'POST';

  const res = await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(corpo),
  });

  if (!res.ok) {
    const dados = await res.json();
    msg.textContent = dados.erro || 'Erro ao salvar';
    return;
  }

  form.reset();
  form.eventoId.value = '';
  carregar();
};

// Ao abrir a página, já busca e mostra os eventos
carregar();
