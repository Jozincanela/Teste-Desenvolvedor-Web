-- a)
CREATE TABLE Alugueis (
    MesAno VARCHAR(5),
    Nome VARCHAR(50),
    Produto VARCHAR(50),
    Cor VARCHAR(20),
    Valor DECIMAL(10, 2)
);
-- b)
SELECT Nome, SUM(Valor) AS ValorTotal
FROM Alugueis
WHERE Produto NOT IN ('Carro', 'Raquete')
GROUP BY Nome;
-- c)
SELECT DISTINCT Cor
FROM Alugueis
WHERE MesAno > '07-22';
