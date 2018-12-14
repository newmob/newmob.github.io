#!/bin/bash

echo "*** Test POST ***"
curl http://localhost:3000/pagamentos/pagamento -X POST -v -H 'Content-type: application/json' -d '{"forma_de_pagamento":"payfast","valor":10,"moeda":"BRL","descrição":"criando um pagamento"}'
echo
echo