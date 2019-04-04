from dados import carregar_acessos

# carrega os dados do arquivo acesso.csv
X, Y = carregar_acessos()

from sklearn.naive_bayes import MultinomialNB

modelo = MultinomialNB()
modelo.fit(X, Y)

resultado = modelo.predict(X)
diferencas = resultado - Y
acertos = [d for d in diferencas if d == 0]
total_de_acertos = len(acertos)
total_de_elementos = len(X)
taxa_de_acerto = 100.0 * total_de_acertos / total_de_elementos

print("Taxa de acerto: ",taxa_de_acerto,"%")
print("Total de elementos: ",total_de_elementos)