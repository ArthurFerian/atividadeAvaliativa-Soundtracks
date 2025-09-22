import dados from "../models/dados.js";
const { trilhaSonora } = dados;

const getAllTrilhas = (req, res) => {
    res.status(200).json({
        total: trilhaSonora.length,
        trilhaSonora: trilhaSonora
    })
}

const getTrilhasById = (req, res) => {
    let id = parseInt(req.params.id);
  
    const trilha = trilhaSonora.find((t) => t.id === id);
  
    res.status(200).json({
      sucess: true,
      trilha: trilha,
    });
  };
  const createTrilha = (req, res) => {
    const { titulo, compositor, genero, duracao, anoLancamento, popularidade, plataforma} = req.body;
  
    if (!titulo) {
        return res.status(400).json({
            success: false,
            message: "O campo 'titulo' é obrigatório para criar uma trilha sonora!"
        });
    }

    if (!anoLancamento || anoLancamento > 2025) {
        return res.status(400).json({
            success: false,
            message: "O campo 'anoLancamento' é obrigatório e deve ser menor que 2025!"
        });
    }

    if (!plataforma) {
        return res.status(400).json({
            success: false,
            message: "O campo 'plataforma' é obrigatório para a criação de uma trilha sonora "
        });
    }

    if (!genero) {
        return res.status(400).json({
            success: false,
            message: "O campo 'genero' é obrigatório para criar uma trilha sonora!"
        });
    }
    if (!duracao) {
        return res.status(400).json({
            success: false,
            message: "O campo 'duracao' é obrigatório para criar uma trilha sonora!"
        });
    }
    if (!compositor) {
        return res.status(400).json({
            success: false,
            message: "O campo 'compositor' é obrigatório para criar uma trilha sonora!"
        });
    }

    if (!popularidade) {
        return res.status(400).json({
            success: false,
            message: "O campo 'popularidade' é obrigatório para criar uma trilha sonora!"
        });
    }

    
    const novaTrilha = {
        id: trilhaSonora.length + 1,
        titulo,
        compositor,
        genero,
        duracao,
        anoLancamento,
        popularidade,
        plataforma
    }

    trilhaSonora.push(novaTrilha);
    res.status(201).json({
        success: true,
        message: "Trilha sonora cadastrada com sucesso",
        trilha: novaTrilha
    })

  }

  const deleteTrilha = (req, res) => {
    let id = parseInt(req.params.id);
    const trilhaParaRemover = trilhaSonora.find(t => t.id === id);

    if (!trilhaParaRemover) {
        return res.status(404).json({
            success: false,
            message: 'Esta trilha sonora nao existe'
        })
    }
    const trilhasFiltradas = trilhaSonora.filter(trilha => trilhaSonora.id !== id);
    trilhaSonora.splice(0, trilhaSonora.length, ...trilhasFiltradas);
    res.status(200).json({
        success: true,
        message: 'Trilha sonora deletada com sucesso',
        trilhaRemovida: trilhaParaRemover
    })
}

const updateCarta = (req, res) => {
    const id = parseInt(req.params.id);

    const { titulo, compositor, genero, duracao, anoLancamento, popularidade, plataforma } = req.body;


    if (isNaN(id)) {
        return res.status(400).json({
            success: false,
            message: "O id deve ser um número válido"
        })
    }
    
    if (!anoLancamento || anoLancamento > 2025) {
        return res.status(400).json({
            success: false,
            message: "O campo 'anoLancamento' é obrigatório e deve ser menor que 2025!"
        });
    }

    const trilhaExiste = trilhaSonora.find(trilha => trilhaSonora.id === id);


    const trilhasAtualizadas = trilhaSonora.map(trilha => {
        return trilhaSonora.id === id
            ? {
                ...trilhaSonora,
                ...(titulo     && { titulo }),
                ...(compositor    && { compositor }),
                ...(genero  && { genero }),
                ...(duracao      && { duracao }),
                ...(popularidade      && { popularidade }),
                ...(plataforma  && { plataforma }),
                ...(anoLancamento && { anoLancamento})
            }
            : trilhaSonora;
    });
    
    trilhaSonora.splice(0, trilhaSonora.length, ...trilhasAtualizadas);

    const trilhaNova = trilhaSonora.find(trilha => trilhaSonora.id === id);

    res.status(200).json({
        success: true,
        message: "Dados atualizados com sucesso",
        carta: trilhaNova
    })

}


export { getAllTrilhas, getTrilhasById, createTrilha, deleteTrilha, updateCarta}