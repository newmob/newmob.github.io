from dados import carregar_acessos

# carrega os dados do arquivo acesso.csv
X, Y = carregar_acessos()

from sklearn.naive_bayes import MultinomialNB

modelo = MultinomialNB()
modelo.fit(X, Y)

teste = [[1,0,1],[0,1]
resultado = modelo.predict(teste)

