import init, { MemManager, InitOutput } from "@kepler-core/kepler-core";

export default class SimulatorAccessor {
    private memManager: MemManager
    private blocks_num: number
    private block_size: number
    private step_size: number
    private sharedMemory: Float64Array
    
    private loadBlocks: number
    private loadStartCallback: Function
    private loadFinishCallback: Function

    private speed: number
    private memIdx: number
    private stepIdx: number
    private okStepIdxL: number
    private okStepIdxU: number

    constructor(memManager: MemManager, memory: WebAssembly.Memory, loadBlocks: number, loadStartCallback: Function, loadFinishCallback: Function) {
        this.memManager = memManager;
        this.blocks_num = memManager.get_blocks_num();
        this.block_size = memManager.get_block_size();
        this.step_size = memManager.get_step_size();
        this.sharedMemory = new Float64Array(memory.buffer, memManager.as_mem_ptr(), this.blocks_num*this.block_size);
        
        this.loadBlocks = loadBlocks;
        this.loadStartCallback = loadStartCallback;
        this.loadFinishCallback = loadFinishCallback;

        this.speed = 0;
        this.stepIdx = 0;
        this.memIdx = 0;
        this.okStepIdxL = 0;
        this.okStepIdxU = this.blocks_num*this.block_size/this.step_size-1;
    }

    public getValue() {
        if (this.stepIdx < this.okStepIdxL || this.okStepIdxU < this.stepIdx) {
            this.loadStartCallback();
            if (this.speed > 0) {
                this.memManager.load_next(this.loadBlocks);
                this.okStepIdxU += this.loadBlocks*this.block_size/this.step_size;
                this.okStepIdxL += this.loadBlocks*this.block_size/this.step_size;
            } else {
                const loadedBlocksNum = this.memManager.load_prev(this.loadBlocks);
                this.okStepIdxL -= loadedBlocksNum*this.block_size/this.step_size;
                this.okStepIdxU -= loadedBlocksNum*this.block_size/this.step_size;
            }
            this.loadFinishCallback();
        }

        const values = [];
        for (var idx = this.memIdx; idx < this.memIdx+this.step_size; ++ idx) {
            values.push(this.sharedMemory[idx]);
        }
        return values;
    }

    public updateCursor(diff: number) {
        this.speed = diff;
        this.stepIdx += diff;
        this.memIdx += diff*this.step_size;
        if (this.stepIdx < 0) {
            this.stepIdx = 0;
            this.memIdx = 0;
        } else if (this.memIdx < 0) {
            this.memIdx += this.blocks_num*this.block_size;
        } else {
            this.memIdx %= this.blocks_num*this.block_size;
        }
    }
}
