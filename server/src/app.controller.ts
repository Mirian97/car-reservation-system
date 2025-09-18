import { Controller, Get } from '@nestjs/common';
import { I18n, I18nContext } from 'nestjs-i18n';
import { AppService } from './app.service';
import { Public } from './decorators/public.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Public()
  getHello(): string {
    return this.appService.getHello();
  }

  @Public()
  @Get('test-i18n')
  testI18n(@I18n() i18n: I18nContext) {
    return {
      message: i18n.t('user.notFound'),
      lang: i18n.lang,
    };
  }
}
