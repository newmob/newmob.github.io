# [é gordinho?, tem perninha curta?, faz auau?]
porco1    = [1, 1, 0]
porco2    = [1, 1, 0]
porco3    = [1, 1, 0]
cachorro1 = [1, 1, 1]
cachorro2 = [0, 1, 1]
cachorro3 = [0, 1, 1]

dados = [porco1, porco2, porco3, cachorro1, cachorro2, cachorro3]

# porco=1 / cachorro=-1
marcacoes = [1, 1, 1, -1, -1, -1]

misterioso1 = [1, 1, 1]  # cachorro = [gordinho, perna curta, late]
misterioso2 = [1, 0, 0]  # porco = [gordinho, nao perna curta, nao late]
misterioso3 = [0, 0, 1]  # cachorro = [nao gordinho, não perna curta, late]
teste = [misterioso1, misterioso2, misterioso3]

from sklearn.naive_bayes import MultinomialNB

marcacoes_teste = [-1, 1, -1]   # resultado esperado

modelo = MultinomialNB()
modelo.fit(dados, marcacoes)
resultado = modelo.predict(teste)
print("Cachorro=-1 / Porco=1")
print("resultado:" , resultado)

diferencas = resultado - marcacoes_teste
print("diferenças:",diferencas," # [0,0,0] significa 100% de acerto")

# taxa de acerto
acertos = [d for d in diferencas if d==0]
total_de_acertos = len(acertos)
total_de_elementos = len(teste)
taxa_de_acerto = 100.0 * (total_de_acertos / total_de_elementos)
print("taxa de acerto: ", taxa_de_acerto,"%")
