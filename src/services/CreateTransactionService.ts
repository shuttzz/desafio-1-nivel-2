import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;

  value: number;

  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({title, value, type}: Request): Transaction {
    if (!['outcome', 'income'].includes(type)) {
      throw new Error('The type must be equal to income and outcome');
    }

    const { total } = this.transactionsRepository.getBalance();

    if (type === "outcome" && total < value) {
      throw new Error('You do not have enough balance');
    }

    return this.transactionsRepository.create({title, value, type});
  }
}

export default CreateTransactionService;
