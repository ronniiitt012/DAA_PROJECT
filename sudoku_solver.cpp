#include <iostream>
using namespace std;
#define N 9
void printBoard(int board[N][N]) {
    for (int i = 0; i < N; i++) {
        for (int j = 0; j < N; j++)
            cout << board[i][j] << " ";
        cout << endl;
    }
    cout << "---------------------\n";
}
bool isValid(int board[N][N], int row, int col, int num) {
    for (int i = 0; i < N; i++) {
        if (board[row][i] == num || board[i][col] == num)
            return false;
    }
    int startRow = row - row % 3;
    int startCol = col - col % 3;

    for (int i = 0; i < 3; i++)
        for (int j = 0; j < 3; j++)
            if (board[startRow + i][startCol + j] == num)
                return false;
    return true;
}
bool solveSudoku(int board[N][N]) {
    for (int row = 0; row < N; row++) {
        for (int col = 0; col < N; col++) {
            if (board[row][col] == 0) {
                for (int num = 1; num <= 9; num++) {
                    if (isValid(board, row, col, num)) {
                        board[row][col] = num;
                        cout << "Placed " << num 
                             << " at (" << row << "," << col << ")\n";
                        printBoard(board);
                        if (solveSudoku(board))
                            return true;
                        board[row][col] = 0;
                        cout << "Backtracking from (" 
                             << row << "," << col << ")\n";
                        printBoard(board);
                    }
                }
                return false;
            }
        }
    }
    return true;
}
int main() {
    int board[N][N];
    cout << "Enter Sudoku (use 0 for empty cells):\n";
    for (int i = 0; i < N; i++)
        for (int j = 0; j < N; j++)
            cin >> board[i][j];
    cout << "\nInitial Board:\n";
    printBoard(board);
    if (solveSudoku(board)) {
        cout << "\nSolved Sudoku:\n";
        printBoard(board);
    } else {
        cout << "No solution exists\n";
    }
    return 0;
}
