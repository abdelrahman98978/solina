import React, { Component, ErrorInfo, ReactNode } from 'react';
import { ShieldAlert, RotateCcw, RefreshCw, CheckCircle2 } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  errorMessage: string;
  errorStack: string;
}

export class ErrorMonitorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    errorMessage: '',
    errorStack: ''
  };

  public static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      errorMessage: error.message || 'حدث خطأ غير متوقع أثناء تشغيل الواجهة',
      errorStack: error.stack || ''
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[Solina Error Monitor]:', error, errorInfo);
  }

  private handleReload = () => {
    this.setState({ hasError: false, errorMessage: '', errorStack: '' });
    window.location.reload();
  };

  private handleResetCacheAndReload = () => {
    try {
      sessionStorage.clear();
    } catch {
      // ignore storage errors
    }
    this.setState({ hasError: false, errorMessage: '', errorStack: '' });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div dir="rtl" className="min-h-screen bg-[#f3f3f3] text-[#141414] flex items-center justify-center p-6 font-arabic">
          <div className="max-w-lg w-full bg-[#ffffff] border border-[#e0e0e0] rounded-[24px] p-8 space-y-6">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-[30%] bg-[#141414] text-white flex items-center justify-center shrink-0">
                <ShieldAlert className="w-5 h-5" strokeWidth={1.75} />
              </div>
              <div>
                <span className="text-[11px] font-bold text-[#707070] uppercase tracking-wider block">
                  SOLINA RECOVERY GUARD
                </span>
                <h1 className="text-lg font-bold text-[#141414]">
                  عذراً، حدث خطأ غير متوقع في عرض هذه الصفحة
                </h1>
              </div>
            </div>

            <p className="text-xs text-[#707070] leading-relaxed">
              تم عزل الخطأ تلقائياً مع الحفاظ الكامل على سجلات الفواتير والمخزون والحجوزات المحفوظة. يمكنك إعادة تحميل الواجهة للمتابعة فوراً.
            </p>

            <details className="p-3.5 rounded-[16px] bg-[#f3f3f3] border border-[#e0e0e0] text-xs">
              <summary className="cursor-pointer font-semibold text-[#707070] flex items-center justify-between">
                <span>التفاصيل التقنية للدعم الفني (للمختصين فقط)</span>
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#141414]">
                  <CheckCircle2 className="w-3 h-3" strokeWidth={1.75} />
                  معزول
                </span>
              </summary>
              <code dir="ltr" className="mt-2 pt-2 border-t border-[#e0e0e0] text-[11px] font-mono text-[#141414] break-all block text-left">
                {this.state.errorMessage}
              </code>
            </details>

            <div className="flex flex-wrap items-center gap-2.5 pt-2">
              <button
                onClick={this.handleReload}
                className="flex-1 py-3 px-5 rounded-full bg-[#141414] hover:bg-black text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" strokeWidth={1.75} />
                <span>إعادة تحميل الواجهة</span>
              </button>
              <button
                onClick={this.handleResetCacheAndReload}
                className="py-3 px-5 rounded-full bg-[#f3f3f3] hover:bg-[#e0e0e0] text-[#141414] border border-[#e0e0e0] text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" strokeWidth={1.75} />
                <span>إعادة ضبط البيانات المؤقتة</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
